import React, { useState } from 'react';
import Layout from '../../components/ContestCompo/Layout';
import ProblemCard from '../../components/ContestCompo/ProblemCard';
import FileUpload from '../../components/ContestCompo/FileUpload';
import ProgressBar from '../../components/ContestCompo/ProgressBar';
import NavigationButtons from '../../components/ContestCompo/NavigationButtons';

const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
    constraints: [
      "2 <= nums.length <= 104",
      "-109 <= nums[i] <= 109",
      "-109 <= target <= 109",
      "Only one valid answer exists."
    ]
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Medium",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.`,
    constraints: [
      "1 <= s.length <= 104",
      "s consists of parentheses only '()[]{}'."
    ]
  }
];

const WeeklyContest = () => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [submissions, setSubmissions] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newSubmissions = [...submissions];
      newSubmissions[currentProblem] = file;
      setSubmissions(newSubmissions);
    }
  };

  const handleSubmit = () => {
    // Here you would typically handle the submission to a backend
    alert('Contest submitted successfully!');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Weekly Contest</h2>
            <span className="text-gray-600">
              Problem {currentProblem + 1} of {mockProblems.length}
            </span>
          </div>
          <ProgressBar current={currentProblem} total={mockProblems.length} />
        </div>

        <ProblemCard {...mockProblems[currentProblem]} />

        <div className="mt-8 mb-8">
          <FileUpload
            onFileSelect={handleFileUpload}
            selectedFile={submissions[currentProblem]}
          />
        </div>

        <NavigationButtons
          onPrevious={() => setCurrentProblem(curr => curr - 1)}
          onNext={() => setCurrentProblem(curr => curr + 1)}
          onSubmit={handleSubmit}
          isFirst={currentProblem === 0}
          isLast={currentProblem === mockProblems.length - 1}
          disableNext={!submissions[currentProblem]}
        />
      </div>
    </Layout>
  );
};

export default WeeklyContest;