// src/components/timeline/TimelineCanvas.tsx

import React, { useRef } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { TimeEntry } from '../../types';
import { useAppStore } from '../../store/appStore';

interface TimelineCanvasProps {
  entries: TimeEntry[];
  onEditEntry: (entry: TimeEntry) => void;
}

export const TimelineCanvas: React.FC<TimelineCanvasProps> = ({
  entries,
  onEditEntry,
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const containerRef = useRef<HTMLDivElement>(null);
  const { updateTimeEntry } = useAppStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    if (!containerRef.current) return;

    const entry = entries.find((e) => e.id === active.id);
    if (!entry) return;

    const containerWidth = containerRef.current.offsetWidth;
    const deltaMinutes = Math.round((delta.x / containerWidth) * 1440);

    const newStartMinutes = entry.startHour * 60 + entry.startMinute + deltaMinutes;

    // 0-1440 범위로 제한
    const clampedStartMinutes = Math.max(0, Math.min(1440 - entry.duration, newStartMinutes));

    const newStartHour = Math.floor(clampedStartMinutes / 60);
    const newStartMinute = clampedStartMinutes % 60;

    updateTimeEntry(entry.id, {
      startHour: newStartHour,
      startMinute: newStartMinute,
    });
  };

  return (
    <div className="relative" ref={containerRef}>
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

      <DndContext onDragEnd={handleDragEnd}>
        <div className="relative h-16 bg-muji-beige rounded overflow-visible">
          {entries.map((entry) => (
            <DraggableTimeEntry
              key={entry.id}
              entry={entry}
              onEdit={onEditEntry}
            />
          ))}
        </div>
      </DndContext>

      <div className="flex mt-2">
        {hours.map((hour) => (
          <div
            key={hour}
            className="flex-shrink-0 border-l border-muji-light h-2"
            style={{ width: 'calc(100% / 24)', minWidth: '30px' }}
          />
        ))}
      </div>
    </div>
  );
};

const DraggableTimeEntry: React.FC<{
  entry: TimeEntry;
  onEdit: (entry: TimeEntry) => void;
}> = ({ entry, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: entry.id,
  });

  const startPercent = ((entry.startHour * 60 + entry.startMinute) / 1440) * 100;
  const widthPercent = (entry.duration / 1440) * 100;

  const style = transform
    ? {
        left: `${startPercent}%`,
        width: `${widthPercent}%`,
        transform: CSS.Translate.toString(transform),
        zIndex: isDragging ? 50 : 1,
      }
    : {
        left: `${startPercent}%`,
        width: `${widthPercent}%`,
      };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`absolute top-0 h-full ${entry.color} hover:opacity-80 transition-opacity cursor-move border-l-2 border-r-2 border-white flex items-center justify-center ${
        isDragging ? 'opacity-70 shadow-lg' : ''
      }`}
      title={`${entry.category} (${entry.duration}분) - 드래그하여 이동`}
      {...listeners}
      {...attributes}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit(entry);
        }}
        className="text-xs text-white font-medium truncate px-1 w-full h-full flex items-center justify-center"
      >
        {entry.category}
      </button>
    </div>
  );
};
