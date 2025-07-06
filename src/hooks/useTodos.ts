import { useState, useEffect, useCallback } from 'react';
import { Todo } from '../types/todo';

const API_BASE_URL = '/api/todos';

interface UseTodosReturn {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  deleteAllTodos: () => Promise<void>;
  refetch: () => Promise<void>;
}

export function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all todos
  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      // Convert date strings to Date objects
      const todosWithDates = data.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
      }));
      setTodos(todosWithDates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching todos:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add a new todo
  const addTodo = useCallback(async (title: string) => {
    try {
      setError(null);
      // Optimistic update
      const tempId = `temp-${Date.now()}`;
      const tempTodo: Todo = {
        id: tempId,
        title,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTodos(prev => [tempTodo, ...prev]);

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const newTodo = await response.json();
      // Convert date strings to Date objects
      const todoWithDates = {
        ...newTodo,
        createdAt: new Date(newTodo.createdAt),
        updatedAt: new Date(newTodo.updatedAt),
      };
      // Replace temporary todo with the real one
      setTodos(prev => prev.map(todo => todo.id === tempId ? todoWithDates : todo));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
      // Revert optimistic update
      await fetchTodos();
      throw err;
    }
  }, [fetchTodos]);

  // Toggle todo completion status
  const toggleTodo = useCallback(async (id: string) => {
    try {
      setError(null);
      // Optimistic update
      setTodos(prev => prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      ));

      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();
      // Convert date strings to Date objects
      const todoWithDates = {
        ...updatedTodo,
        createdAt: new Date(updatedTodo.createdAt),
        updatedAt: new Date(updatedTodo.updatedAt),
      };
      setTodos(prev => prev.map(t => t.id === id ? todoWithDates : t));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
      // Revert optimistic update
      await fetchTodos();
      throw err;
    }
  }, [todos, fetchTodos]);

  // Delete a todo
  const deleteTodo = useCallback(async (id: string) => {
    try {
      setError(null);
      // Optimistic update
      setTodos(prev => prev.filter(todo => todo.id !== id));

      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
      // Revert optimistic update
      await fetchTodos();
      throw err;
    }
  }, [fetchTodos]);

  // Delete all todos
  const deleteAllTodos = useCallback(async () => {
    try {
      setError(null);
      if (!window.confirm('すべてのタスクを削除しますか？')) {
        return;
      }

      // Optimistic update
      setTodos([]);

      const response = await fetch(API_BASE_URL, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todos');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todos');
      // Revert optimistic update
      await fetchTodos();
      throw err;
    }
  }, [todos, fetchTodos]);

  // Initial fetch
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteAllTodos,
    refetch: fetchTodos,
  };
}