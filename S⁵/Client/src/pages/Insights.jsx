import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FinancialDashboard = ({
  monthly_trends = {
    "2025-01": {
        "total_income": 0.0,
        "total_expenses": 6971.82,
        "net_flow": -6971.82,
        "transaction_count": 39,
        "expense_change": 0,
        "income_change": 0
      },
      "2025-02": {
        "total_income": 0.0,
        "total_expenses": 585.0,
        "net_flow": -585.0,
        "transaction_count": 4,
        "expense_change": -91.6090776870315,
        "income_change": 0
      }
  },
  prophet_forecast = { predictions: [

      {"ds": "2025-01-03T00:00:00", "yhat": -136.59914607001792, "yhat_lower": -429.733991009113, "yhat_upper": 190.24130542383432},
      {"ds": "2025-01-06T00:00:00", "yhat": -255.959835385947, "yhat_lower": -565.1979544683751, "yhat_upper": 10.61890275436318},
      {"ds": "2025-01-07T00:00:00", "yhat": 102.65411637006062, "yhat_lower": -201.64076520718768, "yhat_upper": 400.15448952632687},
      {"ds": "2025-01-13T00:00:00", "yhat": -1127.2037199044642, "yhat_lower": -1439.4440695376088, "yhat_upper": -817.3636270359104},
      {"ds": "2025-01-19T00:00:00", "yhat": -284.5623780527166, "yhat_lower": -569.6417511876512, "yhat_upper": -18.700749041530695},
      {"ds": "2025-01-20T00:00:00", "yhat": -1034.8301833579144, "yhat_lower": -1306.9587363818566, "yhat_upper": -744.0704047573315},
      {"ds": "2025-01-21T00:00:00", "yhat": -509.3440762443947, "yhat_lower": -793.3906929447273, "yhat_upper": -216.62956639360212},
      {"ds": "2025-01-22T00:00:00", "yhat": -293.35005379601347, "yhat_lower": -583.058538457792, "yhat_upper": -1.9880056073853998},
      {"ds": "2025-01-23T00:00:00", "yhat": -298.1950018407681, "yhat_lower": -587.4008418246112, "yhat_upper": -10.704646191554108},
      {"ds": "2025-01-24T00:00:00", "yhat": -495.13631868767857, "yhat_lower": -805.3899700088491, "yhat_upper": -215.18865814744365},
      {"ds": "2025-01-25T00:00:00", "yhat": -166.15946696039282, "yhat_lower": -466.98455563585935, "yhat_upper": 121.15475499957167},
      {"ds": "2025-01-26T00:00:00", "yhat": 103.93210791595453, "yhat_lower": -197.34173791752886, "yhat_upper": 389.8001176496247},

  ] },
  anomalies = [
    {
      "date": "2025-01-13",
      "description": "Mr ANKIT KUMAR SAHU",
      "amount": -750.0,
      "category": "Transfer/Payment",
      "reason": "Unusual amount for this category"
    },
    {
      "date": "2025-01-03",
      "description": "TAUFEEQUE AHMAD",
      "amount": -200.0,
      "category": "Travel",
      "reason": "Irregular spending pattern"
    },
    {
      "date": "2025-01-20",
      "description": "Eazydiner",
      "amount": -1318.0,
      "category": "Dining/Food",
      "reason": "Unusual amount for this category"
    },
    {
      "date": "2025-01-22",
      "description": "RELIANCE JIO INFOCOMM",
      "amount": -470.82,
      "category": "Utilities",
      "reason": "Irregular spending pattern"
    },
    {
      "date": "2025-01-13",
      "description": "Unknown",
      "amount": -446.0,
      "category": "Utilities",
      "reason": "Irregular spending pattern"
    }
  ],
  savings_recommendations = [
    {
      "category": "Dining/Food",
      "type": "frequency",
      "description": "Consider consolidating multiple small Dining/Food transactions to reduce overall spending",
      "potential_savings": 37.666000000000004
    },
    {
      "category": "Transfer/Payment",
      "type": "frequency",
      "description": "Consider consolidating multiple small Transfer/Payment transactions to reduce overall spending",
      "potential_savings": 31.342000000000002
    },
    {
      "category": "Dining/Food",
      "type": "large_expense",
      "description": "Large Dining/Food expense on 2025-01-20. Consider planning for similar future expenses",
      "amount": -1318.0
    }
  ]
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="p-4 space-y-6">
      {/* Forecast Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Spending Forecast</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={prophet_forecast.predictions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="ds"
                tickFormatter={formatDate}
              />
              <YAxis />
              <Tooltip
  labelFormatter={formatDate}
  formatter={(value) => {
    if (typeof value === 'number' && !isNaN(value)) {
      return [`$${value.toFixed(2)}`, 'Amount'];
    } else {
      return ['$0.00', 'Amount'];
    }
  }}
/>

              <Line
                type="monotone"
                dataKey="yhat"
                stroke="#2563eb"
                name="Predicted Amount"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Anomalies */}
      {anomalies.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Spending Anomalies</h2>
          {anomalies.map((anomaly, index) => (
            <div key={index} className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <div className="flex">
                <div className="flex-1">
                  <p className="font-bold text-red-700">{anomaly.description}</p>
                  <p className="text-red-600">
                    {formatDate(anomaly.date)} | ${Math.abs(anomaly.amount).toFixed(2)} | {anomaly.category}
                  </p>
                  <p className="text-red-600">{anomaly.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recommendations */}
      {savings_recommendations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Savings Recommendations</h2>
          {savings_recommendations.map((recommendation, index) => (
            <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <div className="flex">
                <div className="flex-1">
                  <p className="font-bold text-blue-700">{recommendation.category}</p>
                  <p className="text-blue-600">{recommendation.description}</p>
                  {recommendation.potential_savings && (
                    <p className="text-blue-600">
                      Potential savings: ${recommendation.potential_savings.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FinancialDashboard;