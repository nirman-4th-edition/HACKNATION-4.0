import React from 'react';

interface TagListProps {
  tags: string[];
}

export function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-200"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}