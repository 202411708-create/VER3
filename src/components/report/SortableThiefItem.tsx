// src/components/report/SortableThiefItem.tsx

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { TimeThief } from '../../types';
import { MujiIcon } from '../common/MujiIcon';

interface SortableThiefItemProps {
  thief: TimeThief;
  rank: number;
}

export const SortableThiefItem: React.FC<SortableThiefItemProps> = ({ thief, rank }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: thief.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const rankColors = ['bg-yellow-400', 'bg-gray-300', 'bg-orange-300'];
  const rankColor = rankColors[rank - 1] || 'bg-muji-beige';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center space-x-3 p-3 bg-white border-2 border-muji-beige rounded-lg cursor-move hover:border-muji-mid hover:shadow-md transition-all"
    >
      <div className={`w-8 h-8 ${rankColor} rounded-full flex items-center justify-center font-bold text-muji-dark flex-shrink-0`}>
        {rank}
      </div>
      <MujiIcon name="drag" size={16} className="text-muji-mid flex-shrink-0" />
      <p className="text-sm text-muji-dark flex-1">{thief.label}</p>
    </div>
  );
};
