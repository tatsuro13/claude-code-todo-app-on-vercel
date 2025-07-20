import { useState } from 'react';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';
import { TodoTabs, FilterType } from './TodoTabs';

interface TodoListProps {
  todos: Todo[];
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDeleteAll?: () => void;
  onAdd?: (title: string) => void;
}

export function TodoList({ todos, onToggle, onDelete, onDeleteAll, onAdd }: TodoListProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('active');

  const handleAddTask = () => {
    if (newTaskTitle.trim() && onAdd) {
      onAdd(newTaskTitle.trim());
      setNewTaskTitle('');
      setIsAddingTask(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    } else if (e.key === 'Escape') {
      setNewTaskTitle('');
      setIsAddingTask(false);
    }
  };

  // Filter todos based on active filter
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const filteredTodos = activeFilter === 'active' ? activeTodos : completedTodos;

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-[#fff6e7] rounded-lg border border-black p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-black">Daily To-Do</h2>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className="text-sm text-gray-600">Today</span>
            </div>
          </div>
          <button
            onClick={onDeleteAll}
            className="w-5 h-5 flex items-center justify-center"
            aria-label="すべてのタスクを削除"
          >
            <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <TodoTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          activeCount={activeTodos.length}
          completedCount={completedTodos.length}
        />

        {/* Todo Items */}
        <div className="flex flex-col gap-1.5">
          {filteredTodos.map((todo) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>

        {/* Add Task - Only show in active tab */}
        {activeFilter === 'active' && (
          <div className="mt-4">
            {isAddingTask ? (
            <div className="flex items-center gap-2 p-[2px]">
              <div className="w-3.5 h-3.5 border border-purple-500 rounded-sm bg-white"></div>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={() => {
                  if (!newTaskTitle.trim()) {
                    setIsAddingTask(false);
                  }
                }}
                placeholder="タスクを入力..."
                className="flex-1 text-sm bg-transparent border-none outline-none placeholder-gray-400"
                autoFocus
              />
            </div>
          ) : (
            <button
              onClick={() => setIsAddingTask(true)}
              className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 transition-colors bg-purple-50 hover:bg-purple-100 px-3 py-2 rounded-md"
            >
              <span className="text-lg leading-none text-purple-600">+</span>
              <span>Add a task</span>
            </button>
          )}
          </div>
        )}
      </div>
    </div>
  );
}