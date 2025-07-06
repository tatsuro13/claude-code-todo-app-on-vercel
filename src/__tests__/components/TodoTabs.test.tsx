import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoTabs } from '../../components/TodoTabs';

describe('TodoTabs', () => {
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('未完了タブと完了タブを表示する', () => {
    render(
      <TodoTabs
        activeFilter="active"
        onFilterChange={mockOnFilterChange}
        activeCount={3}
        completedCount={2}
      />
    );

    expect(screen.getByText('未完了 (3)')).toBeInTheDocument();
    expect(screen.getByText('完了 (2)')).toBeInTheDocument();
  });

  it('アクティブなタブがハイライトされる', () => {
    const { rerender } = render(
      <TodoTabs
        activeFilter="active"
        onFilterChange={mockOnFilterChange}
        activeCount={3}
        completedCount={2}
      />
    );

    const activeTab = screen.getByText('未完了 (3)');
    const completedTab = screen.getByText('完了 (2)');

    expect(activeTab).toHaveClass('text-black', 'border-b-2', 'border-black');
    expect(completedTab).toHaveClass('text-gray-500');

    rerender(
      <TodoTabs
        activeFilter="completed"
        onFilterChange={mockOnFilterChange}
        activeCount={3}
        completedCount={2}
      />
    );

    expect(activeTab).toHaveClass('text-gray-500');
    expect(completedTab).toHaveClass('text-black', 'border-b-2', 'border-black');
  });

  it('タブをクリックするとコールバックが呼ばれる', () => {
    render(
      <TodoTabs
        activeFilter="active"
        onFilterChange={mockOnFilterChange}
        activeCount={3}
        completedCount={2}
      />
    );

    fireEvent.click(screen.getByText('完了 (2)'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('completed');

    fireEvent.click(screen.getByText('未完了 (3)'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('active');
  });

  it('正しいカウントを表示する', () => {
    render(
      <TodoTabs
        activeFilter="active"
        onFilterChange={mockOnFilterChange}
        activeCount={10}
        completedCount={5}
      />
    );

    expect(screen.getByText('未完了 (10)')).toBeInTheDocument();
    expect(screen.getByText('完了 (5)')).toBeInTheDocument();
  });
});