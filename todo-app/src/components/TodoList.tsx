import type { Todo, UpdateTodoInput } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => Promise<boolean>;
  onUpdateTodo: (id: string, updates: UpdateTodoInput) => Promise<boolean>;
  onDeleteTodo: (id: string) => Promise<boolean>;
}

export function TodoList({ todos, onToggleTodo, onUpdateTodo, onDeleteTodo }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">No todos yet</h3>
        <p className="text-gray-500">Add your first todo above to get started!</p>
      </div>
    );
  }

  // Sort todos: pending first, then completed, within each group sort by creation date
  const sortedTodos = [...todos].sort((a, b) => {
    // First, sort by completion status (pending first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then sort by creation date (newest first for pending, oldest first for completed)
    if (!a.completed) {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }
  });

  return (
    <div className="divide-y divide-gray-200" role="list" aria-label="Todo items">
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onUpdate={onUpdateTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </div>
  );
}