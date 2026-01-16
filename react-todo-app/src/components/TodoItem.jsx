import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import confetti from 'canvas-confetti';
import './TodoItem.css';

/**
 * 個々のTodoアイテム
 * @param {object} props - コンポーネントのプロパティ
 * @param {object} props.todo - Todoデータ
 * @param {function} props.onEdit - 編集時のコールバック
 * @param {function} props.onDelete - 削除時のコールバック
 * @param {function} props.onToggle - 完了状態切り替え時のコールバック
 */
const TodoItem = ({ todo, onEdit, onDelete, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);
  const checkboxRef = useRef(null);

  // 派手な紙吹雪エフェクト
  const triggerConfetti = () => {
    if (!checkboxRef.current) return;

    const rect = checkboxRef.current.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // メインの爆発
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
    });

    // 左右に追加の紙吹雪
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: x - 0.1, y },
        colors: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: x + 0.1, y },
        colors: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'],
      });
    }, 100);

    // スター型の紙吹雪
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 360,
        startVelocity: 30,
        gravity: 0.5,
        origin: { x, y },
        shapes: ['star'],
        colors: ['#FFD700', '#FFA500', '#FF4500'],
      });
    }, 200);
  };

  // 完了切り替えハンドラ
  const handleToggle = () => {
    if (!todo.completed) {
      triggerConfetti();
    }
    onToggle(todo.id);
  };

  // dnd-kitのソート機能
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // 編集モード時に入力フィールドにフォーカス
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // 編集を確定
  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  // キー入力ハンドラ
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  // ダブルクリックで編集モードに
  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`todo-item ${todo.completed ? 'completed' : ''} ${isDragging ? 'dragging' : ''}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ duration: 0.2 }}
      layout
    >
      {/* ドラッグハンドル */}
      <div className="drag-handle" {...attributes} {...listeners}>
        <svg viewBox="0 0 20 20" width="20" height="20">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" fill="currentColor"/>
        </svg>
      </div>

      {/* チェックボックス */}
      <button
        ref={checkboxRef}
        className="todo-checkbox"
        onClick={handleToggle}
        aria-label={todo.completed ? 'タスクを未完了にする' : 'タスクを完了にする'}
      >
        {todo.completed && (
          <motion.svg
            viewBox="0 0 24 24"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <path
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
              fill="currentColor"
            />
          </motion.svg>
        )}
      </button>

      {/* テキスト表示/編集 */}
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          className="todo-edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          aria-label="タスクを編集"
        />
      ) : (
        <span
          className="todo-text"
          onDoubleClick={handleDoubleClick}
          title="ダブルクリックで編集"
        >
          {todo.text}
        </span>
      )}

      {/* 削除ボタン */}
      <motion.button
        className="todo-delete-button"
        onClick={() => onDelete(todo.id)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="タスクを削除"
      >
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
            fill="currentColor"
          />
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default TodoItem;
