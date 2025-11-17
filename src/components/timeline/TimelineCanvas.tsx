// src/components/timeline/TimelineCanvas.tsx

import React, { useRef, useState } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { TimeEntry, ActivityCategory } from '../../types';
import { useAppStore } from '../../store/appStore';
import { ACTIVITY_COLORS, ACTIVITY_BORDER_COLORS } from '../../utils/constants';

interface TimelineCanvasProps {
  entries: TimeEntry[];
  onEditEntry: (entry: TimeEntry) => void;
  selectedCategory: ActivityCategory;
}

export const TimelineCanvas: React.FC<TimelineCanvasProps> = ({
  entries,
  onEditEntry,
  selectedCategory,
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const containerRef = useRef<HTMLDivElement>(null);
  const { updateTimeEntry, addTimeEntry } = useAppStore();

  const [isDraggingNew, setIsDraggingNew] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragCurrent, setDragCurrent] = useState<number | null>(null);

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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const minutes = Math.round((x / rect.width) * 1440);

    setDragStart(minutes);
    setDragCurrent(minutes);
    setIsDraggingNew(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingNew || dragStart === null || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const minutes = Math.round((x / rect.width) * 1440);

    setDragCurrent(Math.max(0, Math.min(1440, minutes)));
  };

  const handleMouseUp = () => {
    if (!isDraggingNew || dragStart === null || dragCurrent === null) {
      setIsDraggingNew(false);
      setDragStart(null);
      setDragCurrent(null);
      return;
    }

    const startMinutes = Math.min(dragStart, dragCurrent);
    const endMinutes = Math.max(dragStart, dragCurrent);
    const duration = endMinutes - startMinutes;

    // 최소 5분 이상만 추가
    if (duration >= 5) {
      const startHour = Math.floor(startMinutes / 60);
      const startMinute = startMinutes % 60;

      const newEntry: TimeEntry = {
        id: Date.now().toString(),
        category: selectedCategory,
        startHour,
        startMinute,
        duration,
        color: ACTIVITY_COLORS[selectedCategory],
      };

      addTimeEntry(newEntry);
    }

    setIsDraggingNew(false);
    setDragStart(null);
    setDragCurrent(null);
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
        <div
          className="relative h-16 bg-muji-beige rounded overflow-visible cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {entries.map((entry) => (
            <DraggableTimeEntry
              key={entry.id}
              entry={entry}
              onEdit={onEditEntry}
            />
          ))}

          {isDraggingNew && dragStart !== null && dragCurrent !== null && (
            <div
              className={`absolute top-0 h-full ${ACTIVITY_COLORS[selectedCategory]} opacity-50 border-2 border-dashed ${ACTIVITY_BORDER_COLORS[selectedCategory]}`}
              style={{
                left: `${(Math.min(dragStart, dragCurrent) / 1440) * 100}%`,
                width: `${(Math.abs(dragCurrent - dragStart) / 1440) * 100}%`,
                pointerEvents: 'none',
              }}
            />
          )}
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
