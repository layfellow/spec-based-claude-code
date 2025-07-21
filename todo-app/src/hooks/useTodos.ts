import { useState, useEffect, useCallback } from 'react';
import type { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';
import { TodoService } from '../services/todoService';
import { validateTodoText } from '../utils/validation';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos on mount
  useEffect(() => {
    try {
      const loadedTodos = TodoService.loadTodos();
      setTodos(loadedTodos);
      setError(null);
    } catch (err) {
      setError('Failed to load todos');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new todo
  const addTodo = useCallback(async (input: CreateTodoInput): Promise<Todo | null> => {
    const validation = validateTodoText(input.text);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid todo text');
      return null;
    }

    try {
      const newTodo = TodoService.addTodo(input);
      setTodos(prev => [...prev, newTodo]);
      setError(null);
      return newTodo;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to add todo';
      setError(errorMsg);
      return null;
    }
  }, []);

  // Update an existing todo
  const updateTodo = useCallback(async (id: string, updates: UpdateTodoInput): Promise<boolean> => {
    if (updates.text !== undefined) {
      const validation = validateTodoText(updates.text);
      if (!validation.isValid) {
        setError(validation.error || 'Invalid todo text');
        return false;
      }
    }

    try {
      const updatedTodo = TodoService.updateTodo(id, updates);
      if (!updatedTodo) {
        setError('Todo not found');
        return false;
      }

      setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
      setError(null);
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update todo';
      setError(errorMsg);
      return false;
    }
  }, []);

  // Delete a todo
  const deleteTodo = useCallback(async (id: string): Promise<boolean> => {
    try {
      const success = TodoService.deleteTodo(id);
      if (!success) {
        setError('Todo not found');
        return false;
      }

      setTodos(prev => prev.filter(todo => todo.id !== id));
      setError(null);
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete todo';
      setError(errorMsg);
      return false;
    }
  }, []);

  // Toggle todo completion
  const toggleTodo = useCallback(async (id: string): Promise<boolean> => {
    const todo = todos.find(t => t.id === id);
    if (!todo) {
      setError('Todo not found');
      return false;
    }

    return updateTodo(id, { completed: !todo.completed });
  }, [todos, updateTodo]);

  // Clear completed todos
  const clearCompleted = useCallback(async (): Promise<number> => {
    try {
      const removedCount = TodoService.clearCompleted();
      setTodos(prev => prev.filter(todo => !todo.completed));
      setError(null);
      return removedCount;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to clear completed todos';
      setError(errorMsg);
      return 0;
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Get statistics
  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length,
  };

  return {
    todos,
    loading,
    error,
    stats,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    clearError,
  };
}