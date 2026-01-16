import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import useTodos from './hooks/useTodos';
import './App.css';

/**
 * Todoアプリのメインコンポーネント
 * 一画面でタスクの作成、編集、削除、並び替えが可能
 */
function App() {
  const { todos, addTodo, editTodo, deleteTodo, toggleTodo, reorderTodos } = useTodos();

  // 完了/未完了のカウント
  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="app">
      <div className="app-container">
        {/* ヘッダー */}
        <header className="app-header">
          <h1 className="app-title">React-Todo</h1>
          {totalCount > 0 && (
            <p className="app-stats">
              {completedCount} / {totalCount} 完了
            </p>
          )}
        </header>

        {/* メインコンテンツ */}
        <main className="app-main">
          <TodoForm onAdd={addTodo} />
          <TodoList
            todos={todos}
            onEdit={editTodo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            onReorder={reorderTodos}
          />
        </main>

        {/* フッター */}
        <footer className="app-footer">
          <p>ダブルクリックで編集 • ドラッグで並び替え</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
