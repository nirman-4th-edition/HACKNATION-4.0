import React, { useState } from 'react';
import { LineChart, CandlestickChart, X } from 'lucide-react';
import { StakingToken } from '../types/index';
import { PriceChart } from './charts/PriceChart';
import { ChartType } from '../types/chart';

interface TokenDetailsProps {
  token: StakingToken;
  onClose: () => void;
}

const mockLineData = Array.from({ length: 100 }, (_, i) => ({
  time: new Date(Date.now() - (100 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  value: 3000 + Math.random() * 500,
}));

const mockCandleData = Array.from({ length: 100 }, (_, i) => ({
  time: new Date(Date.now() - (100 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  open: 3000 + Math.random() * 500,
  high: 3000 + Math.random() * 700,
  low: 3000 + Math.random() * 300,
  close: 3000 + Math.random() * 500,
}));

export function TokenDetails({ token, onClose }: TokenDetailsProps) {
  const [chartType, setChartType] = useState<ChartType>('line');

  return (
    <div className="glow-effect bg-[#151530]/50 backdrop-blur-sm rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {token.name} Price Chart
          </h2>
          <p className="text-indigo-300/80">Current Price: ${token.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 bg-[#1C1C42]/30 p-1 rounded-lg">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                chartType === 'line'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'text-indigo-300/80 hover:bg-[#1C1C42]/50'
              }`}
            >
              <LineChart size={20} />
            </button>
            <button
              onClick={() => setChartType('candle')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                chartType === 'candle'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'text-indigo-300/80 hover:bg-[#1C1C42]/50'
              }`}
            >
              <CandlestickChart size={20} />
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-indigo-300/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <PriceChart 
        data={chartType === 'line' ? mockLineData : mockCandleData} 
        type={chartType} 
      />
    </div>
  );
}