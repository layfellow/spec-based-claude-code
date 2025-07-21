interface TodoStatsProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
  onClearCompleted: () => Promise<number>;
  showClearButton?: boolean;
}

export function TodoStats({ stats, onClearCompleted, showClearButton = false }: TodoStatsProps) {
  const handleClearCompleted = async () => {
    if (window.confirm(`Are you sure you want to remove ${stats.completed} completed todos?`)) {
      await onClearCompleted();
    }
  };

  if (stats.total === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">{stats.total}</span> total
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-green-600">{stats.completed}</span> completed
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-blue-600">{stats.pending}</span> pending
          </div>
        </div>
        
        {showClearButton && (
          <button
            onClick={handleClearCompleted}
            className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Clear Completed
          </button>
        )}
      </div>
      
      {/* Progress Bar */}
      {stats.total > 0 && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{Math.round((stats.completed / stats.total) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(stats.completed / stats.total) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}