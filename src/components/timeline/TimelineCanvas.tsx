// src/components/timeline/TimelineCanvas.tsx

import React from 'react';
import type { TimeEntry } from '../../types';

interface TimelineCanvasProps {
  entries: TimeEntry[];
  onEditEntry: (entry: TimeEntry) => void;
}

export const TimelineCanvas: React.FC<TimelineCanvasProps> = ({
  entries,
  onEditEntry,
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="relative">
      <div className="flex border-b border-muji-mid pb-2 mb-4 overflow-x-auto">
        {hours.map((hour) => (
          <div
            key={hour}
            className="flex-shrink-0 text-xs text-muji-mid text-center"
            style={{ width: 'calc(100% / 24)', minWidth: '30px' }}
          >
            {hour}
          </div>
        ))}
      </div>

      <div className="relative h-16 bg-gray-100 rounded overflow-hidden">
        {entries.map((entry) => {
          const startPercent = ((entry.startHour * 60 + entry.startMinute) / 1440) * 100;
          const widthPercent = (entry.duration / 1440) * 100;

          return (
            <button
              key={entry.id}
              onClick={() => onEditEntry(entry)}
              className={`absolute top-0 h-full ${entry.color} hover:opacity-80 transition-opacity cursor-pointer border-l-2 border-r-2 border-white flex items-center justify-center`}
              style={{
                left: `${startPercent}%`,
                width: `${widthPercent}%`,
              }}
              title={`${entry.category} (${entry.duration}분)`}
            >
              <span className="text-xs text-white font-medium truncate px-1">
                {entry.category}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex mt-2">
        {hours.map((hour) => (
          <div
            key={hour}
            className="flex-shrink-0 border-l border-gray-300 h-2"
            style={{ width: 'calc(100% / 24)', minWidth: '30px' }}
          />
        ))}
      </div>
    </div>
  );
};
