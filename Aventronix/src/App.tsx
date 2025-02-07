import React, { useState } from 'react';
import { StatsOverview } from './components/StatsOverview';
import { TokenCard } from './components/TokenCard';
import { TokenDetails } from './components/TokenDetails';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { useTokenFilters } from './hooks/useTokenFilters';
import { Coins } from 'lucide-react';
import { StakingToken } from './types';

const mockTokens = [
  {
    id: '1',
    name: 'Staked Ethereum',
    symbol: 'stETH',
    price: 3245.67,
    marketCap: 15000000000,
    volume24h: 523000000,
    tvl: 12000000000,
    apy: 4.5,
    ratio: 1.0023
  },
  {
    id: '2',
    name: 'Rocket Pool ETH',
    symbol: 'rETH',
    price: 3250.12,
    marketCap: 8000000000,
    volume24h: 321000000,
    tvl: 6000000000,
    apy: 4.8,
    ratio: 1.0045
  },
  {
    id: '3',
    name: 'Staked BNB',
    symbol: 'sBNB',
    price: 456.78,
    marketCap: 3000000000,
    volume24h: 156000000,
    tvl: 2500000000,
    apy: 5.2,
    ratio: 1.0012
  }
];

function App() {
  const [selectedToken, setSelectedToken] = useState<StakingToken | null>(null);
  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filteredTokens,
  } = useTokenFilters(mockTokens);

  return (
    <div className="min-h-screen bg-[#0B0B1E]">
      <nav className="bg-[#151530]/50 backdrop-blur-sm border-b border-indigo-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Coins className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                LiquidStake
              </span>
            </div>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300">
              Connect Wallet
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Liquid Staking Dashboard
          </h1>
          <p className="text-indigo-300/80">
            Track and trade liquid staking tokens across multiple protocols
          </p>
        </div>

        <StatsOverview
          totalTVL={20500000000}
          totalStakers={156789}
          averageAPY={4.83}
          dailyVolume={1000000000}
        />

        {selectedToken && (
          <div className="mb-8">
            <TokenDetails token={selectedToken} onClose={() => setSelectedToken(null)} />
          </div>
        )}

        <div className="mb-6 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar selectedFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTokens.map(token => (
            <div key={token.id} onClick={() => setSelectedToken(token)} className="cursor-pointer">
              <TokenCard token={token} />
            </div>
          ))}
        </div>

        {filteredTokens.length === 0 && (
          <div className="text-center py-12">
            <p className="text-indigo-300/80">No tokens found matching your criteria</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;