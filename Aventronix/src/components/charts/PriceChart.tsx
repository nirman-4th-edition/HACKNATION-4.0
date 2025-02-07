import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';
import { ChartData, ChartType, CandleData } from '../../types/chart';

interface PriceChartProps {
  data: ChartData[] | CandleData[];
  type: ChartType;
}

export function PriceChart({ data, type }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'rgb(17, 24, 39)' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: 'rgba(55, 65, 81, 0.3)' },
        horzLines: { color: 'rgba(55, 65, 81, 0.3)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const series = type === 'line' 
      ? chart.addLineSeries({
          color: 'rgb(59, 130, 246)',
          lineWidth: 2,
        })
      : chart.addCandlestickSeries({
          upColor: '#22c55e',
          downColor: '#ef4444',
          borderVisible: false,
          wickUpColor: '#22c55e',
          wickDownColor: '#ef4444',
        });

    series.setData(data);
    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ 
          width: chartContainerRef.current.clientWidth 
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, type]);

  return (
    <div ref={chartContainerRef} className="w-full" />
  );
}