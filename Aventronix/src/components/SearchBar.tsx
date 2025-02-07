import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300/60 h-5 w-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tokens..."
        className="w-full bg-[#1C1C42]/30 border border-indigo-500/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-indigo-300/60 focus:outline-none focus:border-indigo-500/50 transition-colors"
      />
    </div>
  );
}