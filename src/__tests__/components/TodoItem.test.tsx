import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  const mockOnToggle = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Todoアイテムが正しく表示される', () => {
    render(<TodoItem todo={mockTodo} />);
    
    expect(screen.getByText('テストタスク')).toBeInTheDocument();
  });

  it('チェックボックスが正しい状態で表示される', () => {
    render(<TodoItem todo={mockTodo} />);
    
    const checkbox = screen.getByRole('button', { name: 'テストタスクを完了済みにする' });
    expect(checkbox).toBeInTheDocument();
  });

  it('完了済みのTodoが正しく表示される', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} />);
    
    const checkbox = screen.getByRole('button', { name: 'テストタスクを未完了にする' });
    expect(checkbox).toBeInTheDocument();
    
    const title = screen.getByText('テストタスク');
    expect(title).toHaveClass('line-through');
  });

  it('チェックボックスクリックでonToggleが呼ばれる', () => {
    render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} />);
    
    const checkbox = screen.getByRole('button', { name: 'テストタスクを完了済みにする' });
    fireEvent.click(checkbox);
    
    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('削除ボタンクリックでonDeleteが呼ばれる', () => {
    render(<TodoItem todo={mockTodo} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: 'テストタスクを削除' });
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });
});