import { useState, useRef, useEffect } from 'react';
import type { Todo, UpdateTodoInput } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => Promise<boolean>;
  onUpdate: (id: string, updates: UpdateTodoInput) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleToggle = async () => {
    setIsUpdating(true);
    try {
      await onToggle(todo.id);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = async () => {
    const trimmedText = editText.trim();
    if (!trimmedText) {
      setEditText(todo.text);
      setIsEditing(false);
      return;
    }

    if (trimmedText === todo.text) {
      setIsEditing(false);
      return;
    }

    setIsUpdating(true);
    try {
      const success = await onUpdate(todo.id, { text: trimmedText });
      if (success) {
        setIsEditing(false);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setIsDeleting(true);
      try {
        await onDelete(todo.id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className={`p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors ${isDeleting ? 'opacity-50' : ''}`}>
      {/* Checkbox */}
      <button
        onClick={handleToggle}
        disabled={isUpdating || isDeleting}
        className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          todo.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-gray-400'
        } disabled:opacity-50`}
      >
        {todo.completed && (
          <svg className="w-3 h-3 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Todo Text */}
      <div className="flex-1">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            disabled={isUpdating}
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            maxLength={500}
          />
        ) : (
          <span
            onDoubleClick={handleEdit}
            className={`cursor-pointer select-text ${
              todo.completed
                ? 'line-through text-gray-500'
                : 'text-gray-800 hover:text-gray-600'
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {!isEditing && (
          <button
            onClick={handleEdit}
            disabled={isUpdating || isDeleting}
            className="p-1 text-gray-400 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded disabled:opacity-50"
            title="Edit todo"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        )}
        
        <button
          onClick={handleDelete}
          disabled={isUpdating || isDeleting}
          className="p-1 text-gray-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded disabled:opacity-50"
          title="Delete todo"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L7.586 12l-1.293 1.293a1 1 0 101.414 1.414L9 13.414l1.293 1.293a1 1 0 001.414-1.414L10.414 12l1.293-1.293z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Creation Date */}
      <div className="text-xs text-gray-400 ml-2">
        {todo.createdAt.toLocaleDateString()}
      </div>
    </div>
  );
}