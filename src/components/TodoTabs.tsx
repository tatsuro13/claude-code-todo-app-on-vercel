export type FilterType = 'active' | 'completed';

interface TodoTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
}

export function TodoTabs({ activeFilter, onFilterChange, activeCount, completedCount }: TodoTabsProps) {
  return (
    <div className="flex border-b border-gray-200 mb-4">
      <button
        onClick={() => onFilterChange('active')}
        className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
          activeFilter === 'active'
            ? 'text-black border-b-2 border-black'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        aria-current={activeFilter === 'active' ? 'page' : undefined}
      >
        未完了 ({activeCount})
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
          activeFilter === 'completed'
            ? 'text-black border-b-2 border-black'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        aria-current={activeFilter === 'completed' ? 'page' : undefined}
      >
        完了 ({completedCount})
      </button>
    </div>
  );
}