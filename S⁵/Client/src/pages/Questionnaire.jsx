import { useState } from "react";

const questions = [
  { id: 1, text: "What is your monthly income?", field: "income" },
  { id: 2, text: "What is your monthly savings?", field: "savings" },
  { id: 3, text: "What is your monthly investments?", field: "investments" },
  { id: 4, text: "What is your monthly expenditures?", field: "expenditures" },
];

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({ income: "", savings: "", investments: "", expenditures: "" });

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setFormData({ ...formData, [questions[currentStep].field]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitForm();
    }
  };

  const submitForm = async () => {
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-md w-full text-center">
        <p className="text-gray-500 text-sm mb-2">
          Question {currentStep + 1} of {questions.length}
        </p>
        <h2 className="text-lg font-semibold mb-6">{questions[currentStep].text}</h2>
        <form onSubmit={handleNext} className="space-y-4">
          <input
            type="text"
            name={questions[currentStep].field}
            value={formData[questions[currentStep].field]}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition-all"
          >
            {currentStep < questions.length - 1 ? "Next" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}