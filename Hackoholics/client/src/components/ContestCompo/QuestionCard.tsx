import React from 'react';

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedAnswer: number;
  onSelect: (index: number) => void;
}

const QuestionCard = ({ question, options, selectedAnswer, onSelect }: QuestionCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">{question}</h3>
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
              selectedAnswer === index
                ? 'border-indigo-600 bg-indigo-50 shadow-md'
                : 'border-gray-200 hover:border-indigo-600 hover:shadow-md'
            }`}
          >
            <span className="inline-block w-6 h-6 rounded-full border-2 mr-3 
              ${selectedAnswer === index ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}"
            />
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;