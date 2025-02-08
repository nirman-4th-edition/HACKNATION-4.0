import React from 'react';
import { Difficulty } from '../../types/index';

interface DifficultyBadgeProps {
  level: Difficulty;
}

export function DifficultyBadge({ level }: DifficultyBadgeProps) {
  const colors = {
    beginner: 'bg-green-100 text-green-700 border-green-200',
    intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    advanced: 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${colors[level]}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}