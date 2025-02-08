import React from 'react';
import {
  Search, Filter, Calendar, Download, Upload, Plus,
  TrendingUp, Receipt, CreditCard, DollarSign
} from 'lucide-react';

const ExpensePage = () => {
  return (
    <div className="min-h-screen relative bg-gray-900"> {/* Changed background to gray-900 */}
      {/* Removed Gradient Background */}
      <div className="fixed inset-0">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-[128px] opacity-20" />
        <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-cyan-400 rounded-full filter blur-[128px] opacity-10" />
      </div>

      <div className="relative z-10 p-8">
        {/* Main Content Wrapper */}
        <div className="max-w-7xl mx-auto"> {/* Constrained main content width */}
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white">Expenses</h1>
            <div className="flex space-x-4">
              <button className="bg-cyan-500/20 text-cyan-400 p-2 rounded-lg hover:bg-cyan-500/30">
                <Upload size={20} />
              </button>
              <button className="bg-cyan-500/20 text-cyan-400 p-2 rounded-lg hover:bg-cyan-500/30">
                <Download size={20} />
              </button>
              <button className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-black px-4 py-2 rounded-lg flex items-center">
                <Plus size={20} className="mr-2" />
                Add Expense
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="col-span-2 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions"
                className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div className="relative">
              <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-lg pl-10 pr-4 py-2 text-white appearance-none focus:outline-none focus:border-cyan-500/50">
                <option>All Categories</option>
                <option>Shopping</option>
                <option>Bills</option>
                <option>Entertainment</option>
              </select>
            </div>
            <div className="relative">
              <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-lg pl-10 pr-4 py-2 text-white appearance-none focus:outline-none focus:border-cyan-500/50">
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>Custom Range</option>
              </select>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <QuickStat
              icon={<DollarSign size={24} />}
              title="Total Expenses"
              amount="$3,240.50"
              trend="+12.5%"
              trendUp
            />
            <QuickStat
              icon={<CreditCard size={24} />}
              title="Card Spending"
              amount="$2,125.80"
              trend="-5.2%"
            />
            <QuickStat
              icon={<Receipt size={24} />}
              title="Bills & Utilities"
              amount="$845.20"
              trend="+3.1%"
              trendUp
            />
            <QuickStat
              icon={<TrendingUp size={24} />}
              title="Subscriptions"
              amount="$269.50"
              trend="+0.8%"
              trendUp
            />
          </div>

          {/* Transactions Table */}
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-zinc-800/50">
            <div className="px-6 py-4 border-b border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
            </div>
            <div className="divide-y divide-zinc-800/50">
              {[1, 2, 3, 4, 5].map((item) => (
                <TransactionRow key={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickStat = ({ icon, title, amount, trend, trendUp }) => (
  <div className="bg-zinc-900/50 backdrop-blur-xl rounded-xl p-4 border border-zinc-800/50">
    <div className="flex items-center justify-between mb-3">
      <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
        {icon}
      </div>
      <span className={`text-sm ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
        {trend}
      </span>
    </div>
    <p className="text-gray-400 text-sm mb-1">{title}</p>
    <p className="text-xl font-semibold text-white">{amount}</p>
  </div>
);

const TransactionRow = () => (
  <div className="px-6 py-4 hover:bg-zinc-800/50 transition-colors">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400">
          <CreditCard size={20} />
        </div>
        <div>
          <p className="font-medium text-white">Amazon</p>
          <p className="text-sm text-gray-400">Shopping</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium text-white">-$75.99</p>
        <p className="text-sm text-gray-400">Today, 2:30 PM</p>
      </div>
    </div>
  </div>
);

export default ExpensePage;