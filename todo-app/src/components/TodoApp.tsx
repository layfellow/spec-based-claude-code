import { useTodos } from '../hooks/useTodos';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { TodoStats } from './TodoStats';
import { ErrorMessage } from './ErrorMessage';

export function TodoApp() {
  const {
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
  } = useTodos();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading todos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Todo App</h1>
          <p className="text-sm sm:text-base text-gray-600">Stay organized and get things done</p>
        </header>

        {/* Error Message */}
        {error && (
          <ErrorMessage message={error} onDismiss={clearError} />
        )}

        {/* Add Todo Form */}
        <section className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6 hover:shadow-lg transition-all duration-200" aria-label="Add new todo">
          <TodoForm onAddTodo={addTodo} />
        </section>

        {/* Stats */}
        <TodoStats 
          stats={stats} 
          onClearCompleted={clearCompleted}
          showClearButton={stats.completed > 0}
        />

        {/* Todo List */}
        <main className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200" aria-label="Todo list">
          <TodoList
            todos={todos}
            onToggleTodo={toggleTodo}
            onUpdateTodo={updateTodo}
            onDeleteTodo={deleteTodo}
          />
        </main>

        {/* Footer */}
        <footer className="text-center mt-8 text-sm text-gray-500">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}