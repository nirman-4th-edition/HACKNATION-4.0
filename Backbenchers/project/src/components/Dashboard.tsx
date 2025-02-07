import React, { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/database';
import { PieChart, Wallet, TrendingUp, BookOpen, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TransactionFormData {
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
}

export default function Dashboard() {
  const { t } = useLanguage();
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionForm, setTransactionForm] = useState<TransactionFormData>({
    type: 'income',
    amount: 0,
    description: '',
    category: ''
  });

  const transactions = useLiveQuery(() => 
    db.transactions
      .orderBy('date')
      .reverse()
      .toArray()
  );

  const budgets = useLiveQuery(() => db.budgets.toArray());

  const expenseCategories = [
    'category.essentialNeeds',
    'category.housing',
    'category.utilities',
    'category.groceries',
    'category.healthcare',
    'category.education',
    'category.transportation',
    'category.entertainment',
    'category.shopping',
    'category.insurance',
    'category.emergencyFund',
    'category.investment',
    'category.other'
  ];

  const incomeCategories = [
    'category.salary',
    'category.business',
    'category.farming',
    'category.pension',
    'category.rent',
    'category.investment',
    'category.other'
  ];

  // Calculate total balance
  const totalBalance = transactions?.reduce((acc, curr) => 
    curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0) || 0;

  // Calculate monthly savings (income - expenses for current month)
  const currentMonthTransactions = transactions?.filter(t => {
    const transactionDate = new Date(t.date);
    const currentDate = new Date();
    return transactionDate.getMonth() === currentDate.getMonth() &&
           transactionDate.getFullYear() === currentDate.getFullYear();
  }) || [];

  const monthlySavings = currentMonthTransactions.reduce((acc, curr) => 
    curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0);

  // Calculate budget utilization
  const budgetUtilization = budgets?.map(budget => {
    const spent = currentMonthTransactions
      .filter(t => t.type === 'expense' && t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      ...budget,
      spent,
      percentage: (spent / budget.limit) * 100
    };
  });

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await db.transactions.add({
      ...transactionForm,
      date: new Date(),
      amount: Number(transactionForm.amount)
    });

    setTransactionForm({
      type: 'income',
      amount: 0,
      description: '',
      category: ''
    });
    setShowTransactionModal(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">{t('dashboard.totalBalance')}</p>
              <h3 className="text-2xl font-bold">₹{totalBalance.toFixed(2)}</h3>
            </div>
            <Wallet className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">{t('dashboard.monthlySavings')}</p>
              <h3 className="text-2xl font-bold">₹{monthlySavings.toFixed(2)}</h3>
            </div>
            <PieChart className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">{t('dashboard.totalTransactions')}</p>
              <h3 className="text-2xl font-bold">{transactions?.length || 0}</h3>
            </div>
            <TrendingUp className="text-purple-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">{t('dashboard.activeBudgets')}</p>
              <h3 className="text-2xl font-bold">{budgets?.length || 0}</h3>
            </div>
            <BookOpen className="text-orange-500" size={24} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{t('dashboard.recentTransactions')}</h2>
            <button
              onClick={() => setShowTransactionModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
              <span>{t('dashboard.addTransaction')}</span>
            </button>
          </div>
          <div className="space-y-4">
            {transactions?.slice(0, 5).map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.category}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Overview */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{t('dashboard.budgetOverview')}</h2>
          <div className="space-y-4">
            {budgetUtilization?.map((budget, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{budget.category}</span>
                  <span className="text-gray-500">
                    ₹{budget.spent.toFixed(2)} / ₹{budget.limit.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      budget.percentage > 90 ? 'bg-red-600' :
                      budget.percentage > 70 ? 'bg-yellow-600' :
                      'bg-green-600'
                    }`}
                    style={{ width: `${Math.min(100, budget.percentage)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showTransactionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">{t('dashboard.addNewTransaction')}</h3>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('dashboard.transactionType')}
                </label>
                <select
                  value={transactionForm.type}
                  onChange={(e) => setTransactionForm({
                    ...transactionForm,
                    type: e.target.value as 'income' | 'expense'
                  })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="income">{t('dashboard.income')}</option>
                  <option value="expense">{t('dashboard.expense')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('dashboard.amount')}
                </label>
                <input
                  type="number"
                  value={transactionForm.amount}
                  onChange={(e) => setTransactionForm({
                    ...transactionForm,
                    amount: Number(e.target.value)
                  })}
                  className="w-full p-2 border rounded-md"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('dashboard.description')}
                </label>
                <input
                  type="text"
                  value={transactionForm.description}
                  onChange={(e) => setTransactionForm({
                    ...transactionForm,
                    description: e.target.value
                  })}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('dashboard.category')}
                </label>
                <select
                  value={transactionForm.category}
                  onChange={(e) => setTransactionForm({
                    ...transactionForm,
                    category: e.target.value
                  })}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">{t('dashboard.selectCategory')}</option>
                  {(transactionForm.type === 'income' ? incomeCategories : expenseCategories).map((category) => (
                    <option key={category} value={category}>
                      {t(category)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {t('dashboard.save')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowTransactionModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  {t('dashboard.cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}