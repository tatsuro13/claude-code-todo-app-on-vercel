import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TodoList } from '../../components/TodoList';
import { Todo } from '../../types/todo';

describe('TodoList', () => {
  const mockTodos: Todo[] = [
    {
      id: '1',
      title: 'タスク1',
      completed: false,
      createdAt: new Date('2024-01-15T09:00:00'),
      updatedAt: new Date('2024-01-15T09:00:00'),
    },
    {
      id: '2',
      title: 'タスク2',
      completed: true,
      createdAt: new Date('2024-01-15T10:00:00'),
      updatedAt: new Date('2024-01-15T10:00:00'),
    },
  ];

  it('Todoリストが正しく表示される', () => {
    render(<TodoList todos={mockTodos} />);
    
    expect(screen.getByText('タスク1')).toBeInTheDocument();
    expect(screen.getByText('タスク2')).toBeInTheDocument();
  });

  it('空の状態が正しく表示される', () => {
    render(<TodoList todos={[]} />);
    
    expect(screen.getByText('Todoがありません')).toBeInTheDocument();
    expect(screen.getByText('新しいTodoを追加して、タスクを管理しましょう')).toBeInTheDocument();
  });

  it('正しい数のTodoアイテムが表示される', () => {
    render(<TodoList todos={mockTodos} />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);
  });
});