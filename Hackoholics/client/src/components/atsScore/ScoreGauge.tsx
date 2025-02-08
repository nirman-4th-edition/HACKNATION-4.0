import React from "react";

interface ScoreGaugeProps {
  score: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  // Ensure score stays within range (0-100)
  const validScore = Math.min(100, Math.max(0, score));

  // Map score to a semicircle (0-50 out of 100 for stroke-dasharray)
  const dashArray = `${(validScore / 100) * 50} 50`;

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500 stroke-green-500";
    if (score >= 60) return "text-amber-500 stroke-amber-500";
    return "text-red-500 stroke-red-500";
  };

  return (
    <div className="relative size-56 m-auto">
      <svg
        className="size-full"
        viewBox="0 0 36 36"  // Ensures a balanced semicircle
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background semicircle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-gray-300 dark:stroke-neutral-700"
          strokeWidth="3"
          strokeDasharray="50 50"
          strokeLinecap="round"
          transform="rotate(180 18 18)"  // Ensures correct semicircle positioning
        ></circle>

        {/* Dynamic score arc */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className={`stroke-current ${getScoreColor(validScore)}`}
          strokeWidth="3.5"
          strokeDasharray={dashArray}
          strokeLinecap="round"
          transform="rotate(180 18 18)"  // Corrects the arc's alignment
        ></circle>
      </svg>

      {/* Score display (Adjusted position) */}
      <div className="absolute top-14 start-1/2 transform -translate-x-1/2 text-center">
        <span className={`text-4xl font-bold ${getScoreColor(validScore)}`}>
          {validScore}
        </span>
        <span className={`text-lg block ${getScoreColor(validScore)}`}>
          Score
        </span>
      </div>
    </div>
  );
};
