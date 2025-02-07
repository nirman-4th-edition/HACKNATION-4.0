import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

export type FilterOption = 'all' | 'highest_apy' | 'highest_tvl' | 'highest_volume';

interface FilterBarProps {
  selectedFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

export function FilterBar({ selectedFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-2">
      <div className="flex items-center gap-2 text-indigo-300/80">
        <SlidersHorizontal size={18} />
        <span>Filter by:</span>
      </div>
      <div className="flex gap-2">
        {[
          { id: 'all', label: 'All Tokens' },
          { id: 'highest_apy', label: 'Highest APY' },
          { id: 'highest_tvl', label: 'Highest TVL' },
          { id: 'highest_volume', label: 'Highest Volume' },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id as FilterOption)}
            className={`px-4 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all duration-300 ${
              selectedFilter === filter.id
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                : 'bg-[#1C1C42]/30 text-indigo-300/80 hover:bg-[#1C1C42]/50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}