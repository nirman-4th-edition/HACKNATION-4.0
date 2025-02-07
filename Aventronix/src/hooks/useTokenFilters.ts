import { useState, useMemo } from 'react';
import { StakingToken } from '../types';
import { FilterOption } from '../components/FilterBar';

export function useTokenFilters(tokens: StakingToken[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  const filteredTokens = useMemo(() => {
    let filtered = [...tokens];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        token => 
          token.name.toLowerCase().includes(query) || 
          token.symbol.toLowerCase().includes(query)
      );
    }

    // Apply sorting based on filter
    switch (activeFilter) {
      case 'highest_apy':
        filtered.sort((a, b) => b.apy - a.apy);
        break;
      case 'highest_tvl':
        filtered.sort((a, b) => b.tvl - a.tvl);
        break;
      case 'highest_volume':
        filtered.sort((a, b) => b.volume24h - a.volume24h);
        break;
      default:
        break;
    }

    return filtered;
  }, [tokens, searchQuery, activeFilter]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filteredTokens,
  };
}