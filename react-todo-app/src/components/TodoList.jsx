import { AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TodoItem from './TodoItem';
import './TodoList.css';

/**
 * Todoリスト（ドラッグ&ドロップ対応）
 * @param {object} props - コンポーネントのプロパティ
 * @param {array} props.todos - Todoの配列
 * @param {function} props.onEdit - 編集時のコールバック
 * @param {function} props.onDelete - 削除時のコールバック
 * @param {function} props.onToggle - 完了状態切り替え時のコールバック
 * @param {function} props.onReorder - 並び替え時のコールバック
 */
const TodoList = ({ todos, onEdit, onDelete, onToggle, onReorder }) => {
  // ドラッグセンサーの設定
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px以上移動したらドラッグ開始
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // ドラッグ終了時の処理
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      onReorder(active.id, over.id);
    }
  };

  // Todoがない場合の表示
  if (todos.length === 0) {
    return (
      <div className="todo-empty">
        <p>タスクがありません</p>
        <p className="todo-empty-hint">上のフォームから新しいタスクを追加してください</p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={todos.map((todo) => todo.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="todo-list">
          <AnimatePresence mode="popLayout">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggle={onToggle}
              />
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TodoList;
