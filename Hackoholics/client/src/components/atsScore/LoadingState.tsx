import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12">
      <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 animate-spin mb-3 sm:mb-4" />
      <p className="text-base sm:text-lg text-gray-700">Analyzing your resume...</p>
    </div>
  );
};