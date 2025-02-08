import React, { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, FileUp } from "lucide-react";
import { ScoreGauge } from "./ScoreGauge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface AnalysisResultsProps {
  response: string;
  onReset: () => void;
  btn: string;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  onReset,
  response,
  btn,
}) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const match = response.match(/(\d+)%/);
    if (match) {
      setScore(parseInt(match[1], 10));
    }
  }, [response]);

  console.log("response:", response);
  return (
    <div className="bg-white rounded-xl shadow-xl p-4 sm:p-8 max-w-3xl mx-auto">
      {btn === "btn3" && (
        <div className="text-center mb-8 sm:mb-12">
          <ScoreGauge score={score} />
        </div>
      )}

      <div className="space-y-6 sm:space-y-8">
        <div className={`pt-6 ${btn === "btn3" ? "border-t border-gray-200" : ""}`}>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 px-2">
            Detailed Analysis
          </h3>
          <ReactMarkdown
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto text-left"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {response}
          </ReactMarkdown>
        </div>

        <button
          onClick={onReset}
          className="w-full flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 border border-transparent text-base sm:text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <FileUp className="w-5 h-5 mr-2" />
          Upload New Resume
        </button>
      </div>
    </div>
  );
};
