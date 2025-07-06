import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';

function App() {
  const {
    todos,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteAllTodos,
  } = useTodos();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {error && (
          <div className="max-w-md mx-auto mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            エラー: {error}
          </div>
        )}
        {isLoading ? (
          <div className="max-w-md mx-auto text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-600">読み込み中...</p>
          </div>
        ) : (
          <TodoList 
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onDeleteAll={deleteAllTodos}
            onAdd={addTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App