import React from 'react';
import { Filter } from 'lucide-react';
import { Difficulty } from '../../types/index';

interface DifficultyFilterProps {
  value: Difficulty | '';
  onChange: (value: Difficulty | '') => void;
}

export function DifficultyFilter({ value, onChange }: DifficultyFilterProps) {
  return (
    <div className="flex items-center space-x-3">
      <Filter className="h-5 w-5 text-gray-400" />
      <select
        className="flex-1 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        value={value}
        onChange={(e) => onChange(e.target.value as Difficulty | '')}
      >
        <option value="">All Difficulties</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
    </div>
  );
}