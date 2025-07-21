import type { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';

const STORAGE_KEY = 'todos';

export class TodoService {
  static loadTodos(): Todo[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      return parsed.map((todo: Record<string, unknown>) => ({
        ...todo,
        createdAt: new Date(todo.createdAt as string),
        updatedAt: new Date(todo.updatedAt as string),
      }));
    } catch (error) {
      console.error('Failed to load todos:', error);
      return [];
    }
  }

  static saveTodos(todos: Todo[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos:', error);
      throw new Error('Failed to save todos. Storage might be full.');
    }
  }

  static addTodo(input: CreateTodoInput): Todo {
    const todos = this.loadTodos();
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: input.text.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const updatedTodos = [...todos, newTodo];
    this.saveTodos(updatedTodos);
    return newTodo;
  }

  static updateTodo(id: string, updates: UpdateTodoInput): Todo | null {
    const todos = this.loadTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return null;
    }
    
    const updatedTodo: Todo = {
      ...todos[todoIndex],
      ...updates,
      updatedAt: new Date(),
    };
    
    if (updates.text !== undefined) {
      updatedTodo.text = updates.text.trim();
    }
    
    todos[todoIndex] = updatedTodo;
    this.saveTodos(todos);
    return updatedTodo;
  }

  static deleteTodo(id: string): boolean {
    const todos = this.loadTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    
    if (filteredTodos.length === todos.length) {
      return false; // Todo not found
    }
    
    this.saveTodos(filteredTodos);
    return true;
  }

  static clearCompleted(): number {
    const todos = this.loadTodos();
    const activeTodos = todos.filter(todo => !todo.completed);
    const removedCount = todos.length - activeTodos.length;
    
    this.saveTodos(activeTodos);
    return removedCount;
  }

  static clearStorage(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  static getStats() {
    const todos = this.loadTodos();
    return {
      total: todos.length,
      completed: todos.filter(todo => todo.completed).length,
      pending: todos.filter(todo => !todo.completed).length,
    };
  }
}