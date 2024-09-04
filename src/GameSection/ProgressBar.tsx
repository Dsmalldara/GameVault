import React from 'react';

const ProgressBar = ({ progress, value, totalValue }: { progress: number; value: number; totalValue: number }) => {
  return (
    <div className="w-full flex items-center space-x-4">
      {/* Progress bar container */}
      <div className="flex-1 bg-gray-200 rounded-full h-2.5">
        {/* Actual progress */}
        <div
          className="progress-color h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Completed questions info */}
      <span className="text-sm font-medium text-white">
        {value}/{totalValue} ({Math.round((value / totalValue) * 100)}%)
      </span>
    </div>
  );
};

export default ProgressBar;
