import React from 'react';
import { Filter, Search, SortDesc } from 'lucide-react';

interface SearchBarProps {
  onSearch: (value: string) => void;
  onSort: (order: 'asc' | 'desc') => void;
  onExport: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = React.memo(({ onSearch, onSort,onExport }) => {
  return (
    <div className="bg-white rounded-xl p-6 sticky top-0 z-5 shadow-sm border border-slate-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <SortDesc className="absolute left-3 top-3 text-slate-400" size={20} />
            <select
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg appearance-none bg-white hover:border-indigo-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-full sm:w-auto text-sm sm:text-base"
              onChange={(e) => onSort(e.target.value as 'asc' | 'desc')}
            >
              <option className="text-sm sm:text-base py-2 sm:py-1" value="asc">Sort Ascending</option>
              <option className="text-sm sm:text-base py-2 sm:py-1" value="desc">Sort Descending</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <button className="px-6 py-2 border border-slate-200 rounded-lg hover:border-indigo-500 hover:text-indigo-600 transition-colors duration-200 w-full sm:w-auto">
            Export
          </button>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 w-full sm:w-auto">
            Share
          </button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search companies..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors duration-200"
        />
      </div>
    </div>
  );
});