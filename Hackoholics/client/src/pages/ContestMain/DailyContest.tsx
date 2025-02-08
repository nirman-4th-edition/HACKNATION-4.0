import React, { useState } from 'react';
import Layout from '../../components/ContestCompo/Layout';
import QuestionCard from '../../components/ContestCompo/QuestionCard';
import ProgressBar from '../../components/ContestCompo/ProgressBar';
import NavigationButtons from '../../components/ContestCompo/NavigationButtons';
import { useUIContext } from '../../contexts/ui.context';

import questions from './DailyQuestions';

const mockQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);

const DailyContest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(mockQuestions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const { isSidebarVisible } = useUIContext();

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === mockQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / mockQuestions.length) * 100;

    return (
      <div
        className={`flex-1 p-6 md:p-8  transition-all duration-300 ${isSidebarVisible ? "md:ml-64 ml-0" : "md:ml-20 ml-0"
          }`}
      >
        <Layout>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Quiz Results</h2>
              <div className="mb-8">
                <div className="inline-block p-8 bg-indigo-50 rounded-full mb-6">
                  <span className="text-4xl font-bold text-indigo-600">{percentage.toFixed(1)}%</span>
                </div>
                <p className="text-2xl mb-4">
                  You scored {score} out of {mockQuestions.length}
                </p>
                <p className="text-gray-600">Great effort! Keep practicing to improve your skills.</p>
              </div>
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setAnswers(new Array(mockQuestions.length).fill(-1));
                }}
                className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
              >
                Try Again
              </button>
            </div>
          </div>
        </Layout>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 p-6 md:p-8 transition-all duration-300 -mt-6 ${isSidebarVisible ? "md:ml-64 ml-0" : "md:ml-20 ml-0"
        }`}
    >
      <Layout>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Daily Contest</h2>
              <span className="text-gray-600">
                Question {currentQuestion + 1} of {mockQuestions.length}
              </span>
            </div>
            <ProgressBar current={currentQuestion} total={mockQuestions.length} />
          </div>

          <QuestionCard
            question={mockQuestions[currentQuestion].question}
            options={mockQuestions[currentQuestion].options}
            selectedAnswer={answers[currentQuestion]}
            onSelect={handleAnswer}
          />

          <div className="mt-8">
            <NavigationButtons
              onPrevious={() => setCurrentQuestion(curr => curr - 1)}
              onNext={() => setCurrentQuestion(curr => curr + 1)}
              onSubmit={() => setShowResults(true)}
              isFirst={currentQuestion === 0}
              isLast={currentQuestion === mockQuestions.length - 1}
              disableNext={answers[currentQuestion] === -1}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default DailyContest;