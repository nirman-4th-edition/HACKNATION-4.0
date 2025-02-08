import React from 'react';

interface ProblemCardProps {
  title: string;
  difficulty: string;
  description: string;
  constraints: string[];
}

const ProblemCard = ({ title, difficulty, description, constraints }: ProblemCardProps) => {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[difficulty as keyof typeof difficultyColors]}`}>
          {difficulty}
        </span>
      </div>
      
      <div className="prose max-w-none">
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <pre className="whitespace-pre-wrap font-mono text-sm">
            {description}
          </pre>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800">Constraints:</h4>
          <ul className="list-disc pl-5 space-y-2">
            {constraints.map((constraint, index) => (
              <li key={index} className="text-gray-700">{constraint}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;