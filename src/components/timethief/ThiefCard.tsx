// src/components/timethief/ThiefCard.tsx

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { TimeThief } from '../../types';
import { MujiIcon } from '../common/MujiIcon';

interface ThiefCardProps {
  thief: TimeThief;
}

export const ThiefCard: React.FC<ThiefCardProps> = ({ thief }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: thief.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-4 bg-white border-2 border-muji-beige rounded-lg cursor-move hover:border-muji-mid hover:shadow-md transition-all"
    >
      <div className="flex items-start space-x-2">
        <MujiIcon name="drag" size={16} className="text-muji-mid mt-1 flex-shrink-0" />
        <p className="text-sm text-muji-dark flex-1">{thief.label}</p>
      </div>
    </div>
  );
};
