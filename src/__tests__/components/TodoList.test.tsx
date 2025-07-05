import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

  const mockOnDeleteAll = vi.fn();
  const mockOnAdd = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Todoリストが正しく表示される', () => {
    render(<TodoList todos={mockTodos} />);
    
    expect(screen.getByText('タスク1')).toBeInTheDocument();
    expect(screen.getByText('タスク2')).toBeInTheDocument();
    expect(screen.getByText('Daily To-Do')).toBeInTheDocument();
    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  it('正しい数のTodoアイテムが表示される', () => {
    render(<TodoList todos={mockTodos} />);
    
    const checkboxes = screen.getAllByRole('button', { name: /完了|未完了/ });
    expect(checkboxes).toHaveLength(2);
  });

  it('新しいタスクを追加できる', async () => {
    render(<TodoList todos={mockTodos} onAdd={mockOnAdd} />);
    
    const addButton = screen.getByText('Add a task');
    fireEvent.click(addButton);
    
    const input = screen.getByPlaceholderText('タスクを入力...');
    fireEvent.change(input, { target: { value: '新しいタスク' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith('新しいタスク');
    });
  });

  it('空のタスクは追加されない', async () => {
    render(<TodoList todos={mockTodos} onAdd={mockOnAdd} />);
    
    const addButton = screen.getByText('Add a task');
    fireEvent.click(addButton);
    
    const input = screen.getByPlaceholderText('タスクを入力...');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    await waitFor(() => {
      expect(mockOnAdd).not.toHaveBeenCalled();
    });
  });

  it('Escapeキーでタスク追加をキャンセルできる', async () => {
    render(<TodoList todos={mockTodos} onAdd={mockOnAdd} />);
    
    const addButton = screen.getByText('Add a task');
    fireEvent.click(addButton);
    
    const input = screen.getByPlaceholderText('タスクを入力...');
    fireEvent.change(input, { target: { value: '新しいタスク' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('タスクを入力...')).not.toBeInTheDocument();
      expect(mockOnAdd).not.toHaveBeenCalled();
    });
  });

  it('全削除ボタンが機能する', () => {
    render(<TodoList todos={mockTodos} onDeleteAll={mockOnDeleteAll} />);
    
    const deleteAllButton = screen.getByRole('button', { name: 'すべてのタスクを削除' });
    fireEvent.click(deleteAllButton);
    
    expect(mockOnDeleteAll).toHaveBeenCalled();
  });
});