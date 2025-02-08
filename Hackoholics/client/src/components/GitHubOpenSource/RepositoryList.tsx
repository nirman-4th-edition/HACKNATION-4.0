import React, { useEffect } from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { Repository } from '../../types/index';
import { DifficultyBadge } from './DifficultyBadge';
import { TagList } from './TagList';
import { Pagination } from './Pagination';

interface RepositoryListProps {
  repositories: Repository[];
  searched: Boolean;
}

const ITEMS_PER_PAGE = 5;

export function RepositoryList({ repositories, searched  }: RepositoryListProps) {
  const [currentPage, setCurrentPage] = React.useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searched]);


  const totalPages = Math.ceil(repositories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRepos = repositories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <div className="space-y-6">
        {paginatedRepos.map((repo) => (
          <div 
            key={repo.id} 
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100"
          >
            <div className="sm:flex sm:items-start sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 truncate">{repo.title}</h3>
                  <DifficultyBadge level={repo.difficulty} />
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{repo.description}</p>
                <TagList tags={repo.tags} />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-gray-600">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">{repo.stars.toLocaleString()}</span>
              </div>
              <button className="flex items-center justify-center space-x-2 px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 w-full sm:w-auto" onClick={() => window.open(repo.html_url, '_blank')}>
                <span>View Project</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}