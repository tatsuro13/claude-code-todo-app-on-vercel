import { memo } from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const TodoItem = memo(function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="group flex items-center gap-2 p-[2px] hover:bg-black/10 rounded transition-all duration-200">
      <button
        onClick={() => onToggle?.(todo.id)}
        className="flex items-center justify-center w-3.5 h-3.5 border border-red-500 rounded-sm bg-white hover:bg-red-50 transition-colors"
        aria-label={`${todo.title}${todo.completed ? 'を未完了にする' : 'を完了済みにする'}`}
      >
        {todo.completed && (
          <svg
            className="w-3 h-3 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </button>
      
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-normal transition-all duration-200 ${
          todo.completed 
            ? 'text-gray-500 line-through' 
            : 'text-black'
        }`}>
          {todo.title}
        </p>
      </div>
      
      <button
        onClick={() => onDelete?.(todo.id)}
        className="opacity-0 group-hover:opacity-100 w-5 h-5 flex items-center justify-center transition-opacity duration-200"
        aria-label={`${todo.title}を削除`}
      >
        <svg
          className="w-4 h-4 text-red-500 hover:text-red-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
});