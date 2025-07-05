import { useState } from 'react';
import { Todo } from './types/todo';
import { TodoList } from './components/TodoList';

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      title: 'Stay positive',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Deep clean floors.',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      title: 'Wash windows.',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      title: 'Sanitize high-touch areas.',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '5',
      title: 'Organize closets.',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '6',
      title: 'Stay positive',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '7',
      title: 'Dust surfaces.',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
        : todo
    ));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleDeleteAllTodos = () => {
    if (window.confirm('すべてのタスクを削除しますか？')) {
      setTodos([]);
    }
  };

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <TodoList 
          todos={todos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onDeleteAll={handleDeleteAllTodos}
          onAdd={handleAddTodo}
        />
      </div>
    </div>
  );
}

export default App