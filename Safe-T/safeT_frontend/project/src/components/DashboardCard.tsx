// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: 'up' | 'down';
  trendValue?: string;
  delay?: number;
  isSticky?: boolean;  // New prop for sticky behavior
  stickyTop?: number;  // New prop for controlling top distance
}

export function DashboardCard({
                                title,
                                value,
                                icon,
                                trend,
                                trendValue,
                                delay = 0,
                                isSticky = false,
                                stickyTop = 0
                              }: DashboardCardProps) {
  return (
      <div
          className={`dashboard-card bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/30 p-6 animate-slide-in
        ${isSticky ? 'sticky' : ''}`}
          style={{
            animationDelay: `${delay}ms`,
            ...(isSticky && { top: `${stickyTop}px` })
          }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
          <div className="text-gray-400 dark:text-gray-500">{icon}</div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">{value}</p>
            {trend && trendValue && (
                <p className={`text-sm ${
                    trend === 'up' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
                } flex items-center mt-2`}>
                  {trend === 'up' ? '↑' : '↓'} {trendValue}
                </p>
            )}
          </div>
        </div>
      </div>
  );
}