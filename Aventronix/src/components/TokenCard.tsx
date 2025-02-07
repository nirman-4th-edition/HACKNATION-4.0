import React from 'react';
import { ArrowUpRight, TrendingUp, Wallet } from 'lucide-react';
import { StakingToken } from '../types';
import { CoinLogo } from './CoinLogo';

interface TokenCardProps {
  token: StakingToken;
}

export function TokenCard({ token }: TokenCardProps) {
  return (
    <div className="glow-effect bg-[#151530]/50 backdrop-blur-sm rounded-xl p-6 hover:transform hover:scale-[1.02] transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <CoinLogo symbol={token.symbol} />
          <div>
            <h3 className="text-lg font-semibold text-white">{token.name}</h3>
            <p className="text-indigo-300/80">{token.symbol}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xl font-bold text-white">${token.price.toFixed(2)}</span>
          <div className="flex items-center text-emerald-400 text-sm">
            <TrendingUp size={16} className="mr-1" />
            <span>+2.5%</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#1C1C42]/30 p-3 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-indigo-300/80">TVL</p>
          <p className="font-semibold text-white">${token.tvl.toLocaleString()}</p>
        </div>
        <div className="bg-[#1C1C42]/30 p-3 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-indigo-300/80">APY</p>
          <p className="font-semibold text-emerald-400">{token.apy.toFixed(2)}%</p>
        </div>
        <div className="bg-[#1C1C42]/30 p-3 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-indigo-300/80">24h Volume</p>
          <p className="font-semibold text-white">${token.volume24h.toLocaleString()}</p>
        </div>
        <div className="bg-[#1C1C42]/30 p-3 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-indigo-300/80">Ratio</p>
          <p className="font-semibold text-white">{token.ratio.toFixed(4)}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 px-4 rounded-lg flex items-center justify-center hover:from-indigo-500 hover:to-purple-500 transition-all duration-300">
          <Wallet size={18} className="mr-2" />
          Stake
        </button>
        <button className="flex-1 border border-indigo-500/30 text-indigo-300 py-2.5 px-4 rounded-lg flex items-center justify-center hover:bg-indigo-500/10 transition-all duration-300">
          <ArrowUpRight size={18} className="mr-2" />
          Trade
        </button>
      </div>
    </div>
  );
}