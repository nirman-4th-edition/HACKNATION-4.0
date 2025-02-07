export interface StakingToken {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  volume24h: number;
  tvl: number;
  apy: number;
  ratio: number; // Ratio to underlying asset
}

export interface PriceHistory {
  timestamp: number;
  price: number;
}