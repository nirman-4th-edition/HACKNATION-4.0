import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  onSubmit?: () => void;
  isFirst: boolean;
  isLast: boolean;
  disableNext?: boolean;
}

const NavigationButtons = ({
  onPrevious,
  onNext,
  onSubmit,
  isFirst,
  isLast,
  disableNext
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onPrevious}
        disabled={isFirst}
        className="flex items-center px-4 py-2 text-indigo-600 disabled:text-gray-400 transition-colors duration-200"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Previous
      </button>

      {isLast ? (
        <button
          onClick={onSubmit}
          disabled={disableNext}
          className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
        >
          Submit
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={disableNext}
          className="flex items-center px-4 py-2 text-indigo-600 disabled:text-gray-400 transition-colors duration-200"
        >
          Next
          <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;