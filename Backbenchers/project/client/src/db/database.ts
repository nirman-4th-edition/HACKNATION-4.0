import Dexie, { Table } from 'dexie';

export interface Transaction {
  id?: number;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: Date;
}

export interface Budget {
  id?: number;
  category: string;
  limit: number;
  spent: number;
  period: 'daily' | 'weekly' | 'monthly';
}

export interface Goal {
  id?: number;
  title: string;
  type: 'business' | 'education' | 'emergency' | 'other';
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  monthlyContribution: number;
  status: 'active' | 'completed' | 'paused';
  createdAt: Date;
}

export interface SavingsPlan {
  id?: number;
  name: string;
  targetPercentage: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  lastExecuted?: Date;
  status: 'active' | 'paused';
  createdAt: Date;
}

export interface EducationalContent {
  id?: number;
  title: string;
  content: string;
  language: string;
  category: string;
  lastSynced?: Date;
}

class FinanceDatabase extends Dexie {
  transactions!: Table<Transaction>;
  budgets!: Table<Budget>;
  goals!: Table<Goal>;
  savingsPlans!: Table<SavingsPlan>;
  educationalContent!: Table<EducationalContent>;

  constructor() {
    super('FinanceDatabase');
    this.version(2).stores({
      transactions: '++id, type, category, date',
      budgets: '++id, category, period',
      goals: '++id, type, status, deadline',
      savingsPlans: '++id, frequency, status',
      educationalContent: '++id, language, category'
    });
  }
}

export const db = new FinanceDatabase();