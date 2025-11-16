// src/components/timethief/DropZone.tsx

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import type { TimeThief } from '../../types';
import { ThiefCard } from './ThiefCard';

interface DropZoneProps {
  id: string;
  title: string;
  description: string;
  items: TimeThief[];
  color: 'red' | 'gray' | 'green';
}

export const DropZone: React.FC<DropZoneProps> = ({
  id,
  title,
  description,
  items,
  color,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  const colorStyles = {
    red: {
      border: 'border-muji-red',
      bg: 'bg-muji-pink-light bg-opacity-30',
      activeBg: 'bg-muji-pink-light',
      text: 'text-muji-red',
    },
    gray: {
      border: 'border-muji-beige',
      bg: 'bg-white',
      activeBg: 'bg-muji-beige',
      text: 'text-muji-mid',
    },
    green: {
      border: 'border-muji-green',
      bg: 'bg-muji-green bg-opacity-10',
      activeBg: 'bg-muji-green bg-opacity-20',
      text: 'text-muji-green',
    },
  };

  const styles = colorStyles[color];

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[400px] p-4 border-2 rounded-lg transition-all ${
        isOver
          ? `${styles.activeBg} ${styles.border} border-dashed`
          : `${styles.bg} ${styles.border}`
      }`}
    >
      <div className="text-center mb-4">
        <h3 className={`font-medium text-muji-dark mb-1`}>{title}</h3>
        <p className="text-xs text-muji-mid">{description}</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <ThiefCard key={item.id} thief={item} />
        ))}
        {items.length === 0 && (
          <div className="text-center py-12 text-muji-mid text-sm">
            {id === 'uncategorized' ? '모든 카드가 분류되었습니다' : '여기로 드래그하세요'}
          </div>
        )}
      </div>
    </div>
  );
};
