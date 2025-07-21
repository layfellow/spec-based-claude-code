import { useState, type FormEvent } from 'react';
import type { CreateTodoInput, Todo } from '../types/todo';

interface TodoFormProps {
  onAddTodo: (input: CreateTodoInput) => Promise<Todo | null>;
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const trimmedText = text.trim();
    if (!trimmedText) return;

    setIsSubmitting(true);
    try {
      const result = await onAddTodo({ text: trimmedText });
      if (result) {
        setText(''); // Clear form on success
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="flex-1">
        <label htmlFor="todo-input" className="sr-only">
          Add a new todo
        </label>
        <input
          id="todo-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          disabled={isSubmitting}
          className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          maxLength={500}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !text.trim()}
        className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Adding...</span>
          </div>
        ) : (
          'Add Todo'
        )}
      </button>
    </form>
  );
}