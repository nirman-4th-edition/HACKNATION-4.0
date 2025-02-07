export interface ChartData {
  time: string;
  value: number;
}

export type ChartType = 'line' | 'candle';

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}