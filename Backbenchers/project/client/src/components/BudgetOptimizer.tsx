import { useState } from "react";
import axios from "axios";

const BudgetOptimizer = () => {
  const [formData, setFormData] = useState({
    income: "",
    age: "",
    dependents: "",
    occupation: "Self_Employed",
    city_tier: "Tier_1",
    rent: "",
    loan_payment: "",
    insurance: "",
    groceries: "",
    transport: "",
    eating_out: "",
    entertainment: "",
    utilities: "",
    healthcare: "",
    education: "",
    miscellaneous: "",
  });

  const [result, setResult] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<
    { category: string; reduced_amount: number; new_amount: number }[]
  >([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "occupation" || id === "city_tier" ? value : parseInt(value, 10) || 0,
    }));
  };

  const getBudgetingSuggestions = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:4000/predict", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("API Response:", response.data);

      if (response.data.message === "Good luck! You have already met your desired savings.") {
        setResult(response.data.message);
        setSuggestions([]);
      } else {
        setResult(response.data.message);
        setSuggestions(response.data.reduction_suggestions);
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("An error occurred while processing your request. Please try again later.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Budgeting Insights
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(formData).map((key) =>
          key === "occupation" || key === "city_tier" ? (
            <div key={key} className="mb-4">
              <label className="block text-gray-700 font-medium capitalize" htmlFor={key}>
                {key.replace(/_/g, " ")}:
              </label>
              <select
                id={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {key === "occupation" &&
                  ["Self_Employed", "Retired", "Student", "Professional"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                {key === "city_tier" &&
                  ["Tier_1", "Tier_2", "Tier_3"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </div>
          ) : (
            <div key={key} className="mb-4">
              <label className="block text-gray-700 font-medium capitalize" htmlFor={key}>
                {key.replace(/_/g, " ")}:
              </label>
              <input
                type="number"
                id={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )
        )}
      </div>
      <button
        onClick={getBudgetingSuggestions}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition duration-300"
      >
        Get Suggestions
      </button>
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-300">
          <p className="text-gray-700 font-medium">{result}</p>
          {suggestions.length > 0 && (
            <ul className="list-disc pl-6 mt-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-gray-600">
                  <strong>{suggestion.category}:</strong> Reduce by ₹
                  {suggestion.reduced_amount.toFixed(2)}. New amount: ₹
                  {suggestion.new_amount.toFixed(2)}.
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default BudgetOptimizer;
