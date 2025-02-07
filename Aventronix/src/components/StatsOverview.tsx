import React from 'react';
import { DollarSign, TrendingUp, Users, Activity } from 'lucide-react';
import { StatsCard } from './StatsCard';

interface StatsProps {
  totalTVL: number;
  totalStakers: number;
  averageAPY: number;
  dailyVolume: number;
}

export function StatsOverview({ totalTVL, totalStakers, averageAPY, dailyVolume }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total TVL"
        value={`$${totalTVL.toLocaleString()}`}
        icon={DollarSign}
        color="text-blue-400"
      />
      <StatsCard
        title="Average APY"
        value={`${averageAPY.toFixed(2)}%`}
        icon={TrendingUp}
        color="text-green-400"
      />
      <StatsCard
        title="Total Stakers"
        value={totalStakers.toLocaleString()}
        icon={Users}
        color="text-purple-400"
      />
      <StatsCard
        title="24h Volume"
        value={`$${dailyVolume.toLocaleString()}`}
        icon={Activity}
        color="text-orange-400"
      />
    </div>
  );
}