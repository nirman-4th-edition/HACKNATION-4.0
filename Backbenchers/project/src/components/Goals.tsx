import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Target, TrendingUp, GraduationCap, Building2, Plus, AlertCircle } from 'lucide-react';
import { db } from '../db/database';
import { useLanguage } from '../contexts/LanguageContext';
import type { Goal } from '../db/database';

export default function Goals() {
  const { t } = useLanguage();
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    type: 'business',
    status: 'active'
  });

  const goals = useLiveQuery(() => db.goals.toArray());

  const calculateProgress = (goal: Goal) => {
    return (goal.currentAmount / goal.targetAmount) * 100;
  };

  const getMonthlyContribution = (goal: Goal) => {
    const months = Math.max(1, Math.ceil(
      (new Date(goal.deadline).getTime() - new Date().getTime()) / (30 * 24 * 60 * 60 * 1000)
    ));
    return (goal.targetAmount - goal.currentAmount) / months;
  };

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.title && newGoal.targetAmount && newGoal.deadline) {
      await db.goals.add({
        ...newGoal,
        currentAmount: 0,
        monthlyContribution: getMonthlyContribution(newGoal as Goal),
        status: 'active',
        createdAt: new Date()
      } as Goal);
      setShowAddGoal(false);
      setNewGoal({ type: 'business', status: 'active' });
    }
  };

  const getGoalIcon = (type: string) => {
    switch (type) {
      case 'business':
        return <Building2 className="text-blue-500" />;
      case 'education':
        return <GraduationCap className="text-green-500" />;
      case 'emergency':
        return <AlertCircle className="text-red-500" />;
      default:
        return <Target className="text-purple-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('goals.title')}</h2>
        <button
          onClick={() => setShowAddGoal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          <span>{t('goals.addNew')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals?.map((goal) => (
          <div key={goal.id} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getGoalIcon(goal.type)}
                <h3 className="text-lg font-semibold">{goal.title}</h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm ${
                goal.status === 'active' ? 'bg-green-100 text-green-800' :
                goal.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {t(`goals.status.${goal.status}`)}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{t('goals.progress')}</span>
                  <span>{calculateProgress(goal).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${Math.min(100, calculateProgress(goal))}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">{t('goals.target')}</p>
                  <p className="font-semibold">₹{goal.targetAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">{t('goals.current')}</p>
                  <p className="font-semibold">₹{goal.currentAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">{t('goals.monthly')}</p>
                  <p className="font-semibold">₹{goal.monthlyContribution.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">{t('goals.deadline')}</p>
                  <p className="font-semibold">{new Date(goal.deadline).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">{t('goals.addNewGoal')}</h3>
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('goals.goalTitle')}
                </label>
                <input
                  type="text"
                  value={newGoal.title || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('goals.goalType')}
                </label>
                <select
                  value={newGoal.type}
                  onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value as Goal['type'] })}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="business">{t('goals.types.business')}</option>
                  <option value="education">{t('goals.types.education')}</option>
                  <option value="emergency">{t('goals.types.emergency')}</option>
                  <option value="other">{t('goals.types.other')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('goals.targetAmount')}
                </label>
                <input
                  type="number"
                  value={newGoal.targetAmount || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })}
                  className="w-full p-2 border rounded-md"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('goals.deadline')}
                </label>
                <input
                  type="date"
                  value={newGoal.deadline?.toString().split('T')[0] || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: new Date(e.target.value) })}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {t('goals.save')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  {t('goals.cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}