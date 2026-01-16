import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

/**
 * Todo管理のカスタムフック
 * @returns {object} - Todoの状態と操作関数
 */
const useTodos = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);

  // 新しいTodoを追加
  const addTodo = useCallback((text) => {
    if (!text.trim()) return;

    const newTodo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, [setTodos]);

  // Todoを編集
  const editTodo = useCallback((id, newText) => {
    if (!newText.trim()) return;

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  }, [setTodos]);

  // Todoを削除
  const deleteTodo = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, [setTodos]);

  // 完了状態を切り替え
  const toggleTodo = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [setTodos]);

  // Todoの順序を変更（ドラッグ&ドロップ用）
  const reorderTodos = useCallback((activeId, overId) => {
    setTodos((prevTodos) => {
      const oldIndex = prevTodos.findIndex((todo) => todo.id === activeId);
      const newIndex = prevTodos.findIndex((todo) => todo.id === overId);

      if (oldIndex === -1 || newIndex === -1) return prevTodos;

      const newTodos = [...prevTodos];
      const [movedTodo] = newTodos.splice(oldIndex, 1);
      newTodos.splice(newIndex, 0, movedTodo);

      return newTodos;
    });
  }, [setTodos]);

  return {
    todos,
    addTodo,
    editTodo,
    deleteTodo,
    toggleTodo,
    reorderTodos,
  };
};

export default useTodos;
