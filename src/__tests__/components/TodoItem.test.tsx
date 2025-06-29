import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TodoItem } from '../../components/TodoItem';
import { Todo } from '../../types/todo';

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: '1',
    title: 'テストタスク',
    completed: false,
    createdAt: new Date('2024-01-15T09:00:00'),
    updatedAt: new Date('2024-01-15T09:00:00'),
  };

  it('Todoアイテムが正しく表示される', () => {
    render(<TodoItem todo={mockTodo} />);
    
    expect(screen.getByText('テストタスク')).toBeInTheDocument();
    expect(screen.getByText('2024/1/15')).toBeInTheDocument();
  });

  it('チェックボックスが正しい状態で表示される', () => {
    render(<TodoItem todo={mockTodo} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveAttribute('aria-label', 'テストタスクを未完了にする');
  });

  it('完了済みのTodoが正しく表示される', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute('aria-label', 'テストタスクを完了済みにする');
    
    const title = screen.getByText('テストタスク');
    expect(title).toHaveStyle({ textDecoration: 'line-through' });
  });
});