import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Wallet, Plus, Settings } from 'lucide-react';
import { db } from '../db/database';
import { useLanguage } from '../contexts/LanguageContext';
import type { SavingsPlan } from '../db/database';

export default function AutomatedSavings() {
  const { t } = useLanguage();
  const [showAddPlan, setShowAddPlan] = useState(false);
  const [newPlan, setNewPlan] = useState<Partial<SavingsPlan>>({
    frequency: 'monthly',
    status: 'active'
  });

  const savingsPlans = useLiveQuery(() => db.savingsPlans.toArray());
  const transactions = useLiveQuery(() => 
    db.transactions
      .where('type')
      .equals('income')
      .toArray()
  );

  const calculateMonthlyIncome = () => {
    if (!transactions) return 0;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return transactions
      .filter(t => {
        const date = new Date(t.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const handleAddPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlan.name && newPlan.targetPercentage) {
      await db.savingsPlans.add({
        ...newPlan,
        status: 'active',
        createdAt: new Date()
      } as SavingsPlan);
      setShowAddPlan(false);
      setNewPlan({ frequency: 'monthly', status: 'active' });
    }
  };

  const togglePlanStatus = async (plan: SavingsPlan) => {
    await db.savingsPlans.update(plan.id!, {
      status: plan.status === 'active' ? 'paused' : 'active'
    });
  };

  const monthlyIncome = calculateMonthlyIncome();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('savings.title')}</h2>
        <button
          onClick={() => setShowAddPlan(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          <span>{t('savings.addNew')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savingsPlans?.map((plan) => (
          <div key={plan.id} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Wallet className="text-blue-500" />
                <h3 className="text-lg font-semibold">{plan.name}</h3>
              </div>
              <button
                onClick={() => togglePlanStatus(plan)}
                className={`px-3 py-1 rounded-full text-sm ${
                  plan.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {t(`savings.status.${plan.status}`)}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">{t('savings.targetPercentage')}</p>
                <p className="font-semibold">{plan.targetPercentage}%</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">{t('savings.monthlyAmount')}</p>
                <p className="font-semibold">
                  ₹{((monthlyIncome * plan.targetPercentage) / 100).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">{t('savings.frequency')}</p>
                <p className="font-semibold">{t(`savings.frequencies.${plan.frequency}`)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">{t('savings.lastExecuted')}</p>
                <p className="font-semibold">
                  {plan.lastExecuted ? new Date(plan.lastExecuted).toLocaleDateString() : t('savings.never')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">{t('savings.addNewPlan')}</h3>
            <form onSubmit={handleAddPlan} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('savings.planName')}
                </label>
                <input
                  type="text"
                  value={newPlan.name || ''}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('savings.targetPercentage')}
                </label>
                <input
                  type="number"
                  value={newPlan.targetPercentage || ''}
                  onChange={(e) => setNewPlan({ ...newPlan, targetPercentage: Number(e.target.value) })}
                  className="w-full p-2 border rounded-md"
                  min="1"
                  max="100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('savings.frequency')}
                </label>
                <select
                  value={newPlan.frequency}
                  onChange={(e) => setNewPlan({ ...newPlan, frequency: e.target.value as SavingsPlan['frequency'] })}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="daily">{t('savings.frequencies.daily')}</option>
                  <option value="weekly">{t('savings.frequencies.weekly')}</option>
                  <option value="monthly">{t('savings.frequencies.monthly')}</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {t('savings.save')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddPlan(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  {t('savings.cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}