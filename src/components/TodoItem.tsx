import { memo } from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = memo(function TodoItem({ todo }: TodoItemProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#ffffff',
      transition: 'background-color 0.2s',
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        readOnly
        aria-label={`${todo.title}${todo.completed ? 'を完了済みにする' : 'を未完了にする'}`}
        style={{
          width: '20px',
          height: '20px',
          marginRight: '12px',
          cursor: 'pointer',
          accentColor: '#3b82f6',
          outline: 'none',
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.3)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
      <span style={{
        flex: 1,
        fontSize: '16px',
        color: todo.completed ? '#9ca3af' : '#1f2937',
        textDecoration: todo.completed ? 'line-through' : 'none',
        transition: 'all 0.2s',
      }}>
        {todo.title}
      </span>
      <span style={{
        fontSize: '12px',
        color: '#9ca3af',
      }}>
        {new Date(todo.createdAt).toLocaleDateString('ja-JP')}
      </span>
    </div>
  );
});