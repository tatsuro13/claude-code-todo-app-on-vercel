import { memo } from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = memo(function TodoItem({ todo }: TodoItemProps) {
  return (
    <div className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          readOnly
          aria-label={`${todo.title}${todo.completed ? 'を完了済みにする' : 'を未完了にする'}`}
          className="peer w-5 h-5 rounded-md border-2 border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-all cursor-pointer checked:bg-blue-500 checked:border-blue-500"
        />
        <svg
          className="absolute left-0.5 top-0.5 w-4 h-4 text-white pointer-events-none hidden peer-checked:block"
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
      </div>
      
      <div className="flex-1 min-w-0">
        <p className={`text-base font-medium transition-all duration-200 ${
          todo.completed 
            ? 'text-gray-400 dark:text-gray-500 line-through' 
            : 'text-gray-900 dark:text-gray-100'
        }`}>
          {todo.title}
        </p>
      </div>
      
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <time className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          {new Date(todo.createdAt).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </time>
      </div>
    </div>
  );
});