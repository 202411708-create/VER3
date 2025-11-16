// src/components/common/ProgressBar.tsx

import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  labels?: string[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  labels = ['시작', '시간여행', '분석', '시간도둑', '순위', '1년 환산', '성찰'],
}) => {
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-2">
        {labels.map((label, index) => (
          <div
            key={index}
            className={`text-xs md:text-sm ${
              index + 1 <= current
                ? 'text-muji-dark font-medium'
                : 'text-muji-light'
            }`}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="h-1.5 bg-muji-beige rounded-full overflow-hidden">
        <div
          className="h-full bg-muji-dark transition-all duration-500"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
};
