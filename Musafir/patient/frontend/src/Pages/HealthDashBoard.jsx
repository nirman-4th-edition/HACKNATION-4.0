import React, { useState, useMemo } from 'react';
import { Search, FileText, Plus, Edit, Trash, Download, Filter } from 'lucide-react';

const HealthDashboard = () => {
  // Vitals Overview
  const [vitals, setVitals] = useState({
    bloodPressure: '120/80',
    sugarLevel: '90 mg/dL'
  });

  const updateVitals = (newVitals) => {
    setVitals(newVitals);
  };

  // AI-Powered Insights
  const [insights, setInsights] = useState({
    healthTrends: 'Stable',
    suggestions: 'Maintain a healthy diet and exercise routine.'
  });

  const updateInsights = (newInsights) => {
    setInsights(newInsights);
  };

  // Government Scheme Alerts
  const [schemeAlerts, setSchemeAlerts] = useState([
    {
      id: 1,
      name: 'National Health Protection Scheme',
      eligibility: 'Household income below ₹10,000 per month'
    },
    {
      id: 2,
      name: 'Ayushman Bharat Yojana',
      eligibility: 'Below Poverty Line (BPL) families'
    }
  ]);

  const addSchemeAlert = (newAlert) => {
    setSchemeAlerts([...schemeAlerts, newAlert]);
  };

  const deleteSchemeAlert = (id) => {
    setSchemeAlerts(schemeAlerts.filter(alert => alert.id !== id));
  };

  // Daily Health Tips
  const [healthTips, setHealthTips] = useState([
    'Drink plenty of water throughout the day.',
    'Get at least 30 minutes of moderate exercise daily.',
    'Eat a balanced diet rich in fruits, vegetables, and whole grains.',
    'Practice stress-reducing techniques like meditation or yoga.'
  ]);

  const addHealthTip = (newTip) => {
    setHealthTips([...healthTips, newTip]);
  };

  const deleteHealthTip = (index) => {
    const updatedTips = [...healthTips];
    updatedTips.splice(index, 1);
    setHealthTips(updatedTips);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-blue-950">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Health Dashboard</h1>
      </div>

      {/* Vitals Overview */}
      <div className="mb-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Vitals Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium">Blood Pressure</h3>
            <p>{vitals.bloodPressure}</p>
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => updateVitals({ bloodPressure: '125/85', sugarLevel: '95 mg/dL' })}
            >
              Update Vitals
            </button>
          </div>
          <div>
            <h3 className="text-lg font-medium">Sugar Levels</h3>
            <p>{vitals.sugarLevel}</p>
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => updateVitals({ bloodPressure: '118/78', sugarLevel: '92 mg/dL' })}
            >
              Update Vitals
            </button>
          </div>
        </div>
      </div>

      {/* AI-Powered Insights */}
      <div className="mb-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">AI-Powered Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium">Health Trends</h3>
            <p>{insights.healthTrends}</p>
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => updateInsights({ healthTrends: 'Improving', suggestions: 'Keep up the good work!' })}
            >
              Update Insights
            </button>
          </div>
          <div>
            <h3 className="text-lg font-medium">Personalized Suggestions</h3>
            <p>{insights.suggestions}</p>
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => updateInsights({ healthTrends: 'Stable', suggestions: 'Maintain a balanced lifestyle' })}
            >
              Update Insights
            </button>
          </div>
        </div>
      </div>

      {/* Government Scheme Alerts */}
      <div className="mb-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Government Scheme Alerts</h2>
        <ul className="space-y-4">
          {schemeAlerts.map(alert => (
            <li key={alert.id} className="bg-gray-100 rounded-lg p-4">
              <h3 className="text-lg font-medium">{alert.name}</h3>
              <p>{alert.eligibility}</p>
              <button
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                onClick={() => deleteSchemeAlert(alert.id)}
              >
                Remove Alert
              </button>
            </li>
          ))}
          <li className="bg-gray-100 rounded-lg p-4">
            <input
              type="text"
              placeholder="New Scheme Name"
              className="w-full p-2 border rounded mb-2"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addSchemeAlert({ id: Date.now(), name: e.target.value, eligibility: 'New scheme eligibility' });
                  e.target.value = '';
                }
              }}
            />
            <input
              type="text"
              placeholder="New Scheme Eligibility"
              className="w-full p-2 border rounded mb-2"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addSchemeAlert({ id: Date.now(), name: 'New Scheme', eligibility: e.target.value });
                  e.target.value = '';
                }
              }}
            />
          </li>
        </ul>
      </div>

      {/* Daily Health Tips */}
      <div className="mb-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Daily Health Tips</h2>
        <ul className="space-y-4">
          {healthTips.map((tip, index) => (
            <li key={index} className="bg-gray-100 rounded-lg p-4">
              <p>{tip}</p>
              <button
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                onClick={() => deleteHealthTip(index)}
              >
                Remove Tip
              </button>
            </li>
          ))}
          <li className="bg-gray-100 rounded-lg p-4">
            <input
              type="text"
              placeholder="New Health Tip"
              className="w-full p-2 border rounded mb-2"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addHealthTip(e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HealthDashboard;