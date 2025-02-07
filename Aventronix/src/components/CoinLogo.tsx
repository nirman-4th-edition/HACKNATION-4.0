import React from 'react';

interface CoinLogoProps {
  symbol: string;
  size?: 'sm' | 'md' | 'lg';
}

const getLogoUrl = (symbol: string): string => {
  // Map of token symbols to their logo URLs
  const logoMap: Record<string, string> = {
    stETH: 'https://assets.coingecko.com/coins/images/13442/small/steth_logo.png',
    rETH: 'https://assets.coingecko.com/coins/images/20764/small/reth.png',
    sBNB: 'https://assets.coingecko.com/coins/images/24227/small/stkBNB_token_logo.png',
  };
  
  return logoMap[symbol] || 'https://assets.coingecko.com/coins/images/279/small/ethereum.png';
};

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10'
};

export function CoinLogo({ symbol, size = 'md' }: CoinLogoProps) {
  return (
    <div className={`relative group ${sizeClasses[size]}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <img
        src={getLogoUrl(symbol)}
        alt={`${symbol} logo`}
        className={`${sizeClasses[size]} rounded-full relative z-10 bg-[#151530] p-0.5 transform transition-transform duration-300 group-hover:scale-105`}
      />
    </div>
  );
}