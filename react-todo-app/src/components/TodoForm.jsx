import { useState } from 'react';
import { motion } from 'framer-motion';
import './TodoForm.css';

/**
 * 新規Todo追加フォーム
 * @param {object} props - コンポーネントのプロパティ
 * @param {function} props.onAdd - Todo追加時のコールバック
 */
const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');

  // フォーム送信ハンドラ
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <motion.form
      className="todo-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="text"
        className="todo-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="新しいタスクを入力..."
        aria-label="新しいタスクを入力"
      />
      <motion.button
        type="submit"
        className="todo-add-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={!text.trim()}
      >
        追加
      </motion.button>
    </motion.form>
  );
};

export default TodoForm;
