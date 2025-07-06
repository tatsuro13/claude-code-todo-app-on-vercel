import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useTodos } from '../../hooks/useTodos';

// Mock fetch
global.fetch = vi.fn();

describe('useTodos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('初期ロード時にTodoを取得する', async () => {
    const mockTodos = [
      {
        id: '1',
        title: 'Test Todo',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodos,
    });

    const { result } = renderHook(() => useTodos());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].id).toBe(mockTodos[0].id);
    expect(result.current.todos[0].title).toBe(mockTodos[0].title);
    expect(result.current.todos[0].completed).toBe(mockTodos[0].completed);
    expect(result.current.todos[0].createdAt).toBeInstanceOf(Date);
    expect(result.current.todos[0].updatedAt).toBeInstanceOf(Date);
    expect(result.current.error).toBeNull();
  });

  it('Todoを追加できる', async () => {
    const mockTodos: any[] = [];
    const newTodo = {
      id: '1',
      title: 'New Todo',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    (global.fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTodos,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => newTodo,
      });

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await result.current.addTodo('New Todo');

    await waitFor(() => {
      expect(result.current.todos).toHaveLength(1);
      expect(result.current.todos[0].title).toBe('New Todo');
    });
  });

  it('Todoの完了状態を切り替えられる', async () => {
    const mockTodo = {
      id: '1',
      title: 'Test Todo',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    (global.fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [mockTodo],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ...mockTodo, completed: true }),
      });

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await result.current.toggleTodo('1');

    await waitFor(() => {
      expect(result.current.todos[0].completed).toBe(true);
    });
  });

  it('エラーハンドリングが機能する', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
  });
});