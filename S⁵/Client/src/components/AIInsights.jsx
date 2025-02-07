import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AIInsights = () => {
  const [insights, setInsights] = useState([]); // ✅ Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await axios.get("/api/insights");

        // ✅ Ensure response is an array before setting state
        if (Array.isArray(response.data)) {
          setInsights(response.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching AI insights", error);

        // ✅ Fallback dummy insights to prevent errors
        setInsights([
          { title: "Reduce Subscription Costs", description: "You could save ₹1,200/month by optimizing your streaming subscriptions." },
          { title: "Investment Opportunity", description: "Consider investing in low-risk mutual funds." },
          { title: "Tax Savings", description: "Invest ₹50,000 in tax-saving instruments to save ₹15,000 in taxes." }
        ]);
      }
      setLoading(false);
    };

    fetchInsights();
  }, []);

  return (
    <div className="mt-6">
      <Link to="/insights" className="text-xl font-bold text-purple-400">
        AI Insights
      </Link>
      {loading ? (
        <p className="text-gray-400 mt-4">Loading insights...</p>
      ) : (
        <div className="mt-4 space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-purple-300">{insight.title}</h3>
              <p className="text-gray-400">{insight.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIInsights;