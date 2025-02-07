import React, { useState, useEffect } from 'react';
import { db } from '../db/database';
import { PlusCircle, Trash2, Brain } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BudgetCategory {
  name: string;
  percentage: number;
  description: string;
}

export default function Budget() {
  const { t } = useLanguage();
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  useEffect(() => {
    const loadBudget = async () => {
      const savedBudgets = await db.budgets.toArray();
      if (savedBudgets.length === 0) {
        setCategories([
          { 
            name: t('category.essentialNeeds'), 
            percentage: 50, 
            description: t('description.essentialNeeds.mid')
          },
          { 
            name: t('category.savings'), 
            percentage: 30, 
            description: t('description.savings')
          },
          { 
            name: t('category.lifestyle'), 
            percentage: 20, 
            description: t('description.lifestyle.mid')
          }
        ]);
      } else {
        const loadedCategories = savedBudgets.map(budget => ({
          name: budget.category,
          percentage: (budget.limit / monthlyIncome) * 100,
          description: budget.category
        }));
        setCategories(loadedCategories);
      }
    };
    loadBudget();
  }, [monthlyIncome, t]);

  const getAISuggestions = () => {
    const suggestions = [];
    if (monthlyIncome < 20000) {
      suggestions.push(
        { 
          name: t('category.essentialNeeds'), 
          percentage: 60, 
          description: t('description.essentialNeeds.low')
        },
        { 
          name: t('category.emergencyFund'), 
          percentage: 25, 
          description: t('description.emergencyFund')
        },
        { 
          name: t('category.flexibleSpending'), 
          percentage: 15, 
          description: t('description.flexibleSpending')
        }
      );
    } else if (monthlyIncome < 50000) {
      suggestions.push(
        { 
          name: t('category.essentialNeeds'), 
          percentage: 50, 
          description: t('description.essentialNeeds.mid')
        },
        { 
          name: t('category.savings'), 
          percentage: 30, 
          description: t('description.savings')
        },
        { 
          name: t('category.lifestyle'), 
          percentage: 20, 
          description: t('description.lifestyle.mid')
        }
      );
    } else {
      suggestions.push(
        { 
          name: t('category.essentialNeeds'), 
          percentage: 40, 
          description: t('description.essentialNeeds.high')
        },
        { 
          name: t('category.investments'), 
          percentage: 40, 
          description: t('description.investments')
        },
        { 
          name: t('category.lifestyle'), 
          percentage: 20, 
          description: t('description.lifestyle.high')
        }
      );
    }
    return suggestions;
  };

  const handleSaveBudget = async () => {
    await db.budgets.clear();
    
    const budgets = categories.map(cat => ({
      category: cat.name,
      limit: (monthlyIncome * cat.percentage) / 100,
      spent: 0,
      period: 'monthly' as const
    }));
    
    await db.budgets.bulkAdd(budgets);
  };

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { 
        name: newCategory, 
        percentage: 0, 
        description: t('budget.newCategory')
      }]);
      setNewCategory('');
    }
  };

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const updatePercentage = (index: number, value: number) => {
    const newCategories = [...categories];
    newCategories[index].percentage = Math.min(100, Math.max(0, value));
    setCategories(newCategories);
  };

  const applyAISuggestions = () => {
    const suggestions = getAISuggestions();
    setCategories(suggestions);
    setShowAISuggestions(false);
  };

  const totalPercentage = categories.reduce((sum, cat) => sum + cat.percentage, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">{t('budget.title')}</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('budget.monthlyIncome')}
          </label>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="w-full p-2 border rounded-md"
            placeholder={t('budget.enterIncome')}
          />
        </div>

        <button
          onClick={() => setShowAISuggestions(true)}
          className="flex items-center space-x-2 mb-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Brain size={20} />
          <span>{t('budget.getAiSuggestions')}</span>
        </button>

        {showAISuggestions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">{t('budget.aiSuggestions')}</h3>
              <p className="mb-4 text-gray-600">
                {t('budget.basedOnIncome', { income: monthlyIncome.toString() })}
              </p>
              {getAISuggestions().map((suggestion, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-semibold">
                    {suggestion.name} ({suggestion.percentage}%)
                  </h4>
                  <p className="text-sm text-gray-600">{suggestion.description}</p>
                </div>
              ))}
              <div className="flex space-x-4">
                <button
                  onClick={applyAISuggestions}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  {t('budget.applySuggestions')}
                </button>
                <button
                  onClick={() => setShowAISuggestions(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  {t('budget.cancel')}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  {category.name}
                </label>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
              <input
                type="number"
                value={category.percentage}
                onChange={(e) => updatePercentage(index, Number(e.target.value))}
                className="w-24 p-2 border rounded-md"
              />
              <span className="text-gray-500">%</span>
              <button
                onClick={() => removeCategory(index)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center space-x-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 p-2 border rounded-md"
            placeholder={t('budget.newCategory')}
          />
          <button
            onClick={addCategory}
            className="p-2 text-blue-600 hover:text-blue-800"
          >
            <PlusCircle size={20} />
          </button>
        </div>

        <div className="mt-6">
          <div className={`text-${totalPercentage === 100 ? 'green' : 'red'}-600 mb-4`}>
            {t('budget.totalAllocation', { total: totalPercentage.toString() })}
            {totalPercentage !== 100 && t('budget.shouldEqual')}
          </div>

          <button
            onClick={handleSaveBudget}
            disabled={totalPercentage !== 100}
            className={`w-full px-4 py-2 rounded-lg ${
              totalPercentage === 100
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {t('budget.savePlan')}
          </button>
        </div>
      </div>

      {monthlyIncome > 0 && categories.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">{t('budget.monthlyBreakdown')}</h3>
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{category.name}</span>
                <span className="text-gray-600">
                  ₹{((monthlyIncome * category.percentage) / 100).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}