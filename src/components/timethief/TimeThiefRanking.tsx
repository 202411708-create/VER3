// src/components/timethief/TimeThiefRanking.tsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '../common/Button';
import { MujiIcon } from '../common/MujiIcon';
import { ProgressBar } from '../common/ProgressBar';
import { useAppStore } from '../../store/appStore';
import type { TimeThief } from '../../types';

export const TimeThiefRanking: React.FC = () => {
  const { timeThieves, setStep, setTimeThieves, reset } = useAppStore();

  const stealThieves = timeThieves.filter((t) => t.category === 'steal');

  const [ranked, setRanked] = useState<(TimeThief | null)[]>([null, null, null]);
  const [unranked, setUnranked] = useState<TimeThief[]>([]);

  useEffect(() => {
    setUnranked(stealThieves);
  }, [stealThieves.length]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const allThieves = [...unranked, ...ranked.filter((t): t is TimeThief => t !== null)];
    const draggedThief = allThieves.find((t) => t.id === active.id);

    if (!draggedThief) return;

    if (over.id === 'rank-1' || over.id === 'rank-2' || over.id === 'rank-3') {
      const rankIndex = parseInt(over.id.split('-')[1]) - 1;
      const newRanked = [...ranked];

      const existingInRank = newRanked[rankIndex];
      if (existingInRank) {
        setUnranked((prev) => [...prev.filter(t => t.id !== draggedThief.id), existingInRank]);
      } else {
        setUnranked((prev) => prev.filter((t) => t.id !== draggedThief.id));
      }

      newRanked[rankIndex] = draggedThief;
      setRanked(newRanked);
    } else if (over.id === 'unranked') {
      const fromRanked = ranked.find(t => t?.id === draggedThief.id);
      if (fromRanked) {
        setRanked((prev) => prev.map((t) => (t?.id === draggedThief.id ? null : t)));
        setUnranked((prev) => [...prev, draggedThief]);
      }
    }
  };

  const handleNext = () => {
    const updatedThieves = timeThieves.map((t) => {
      const rankIndex = ranked.findIndex((r) => r?.id === t.id);
      if (rankIndex >= 0) {
        return { ...t, rank: rankIndex + 1 };
      }
      return t;
    });

    setTimeThieves(updatedThieves);
    setStep(6);
  };

  const canProceed = ranked.filter(Boolean).length >= 3;

  if (stealThieves.length === 0) {
    return (
      <div className="min-h-screen bg-muji-bg flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-muji-mid mb-4">시간도둑으로 분류된 항목이 없습니다.</p>
          <Button onClick={() => setStep(6)}>다음으로 건너뛰기</Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-muji-bg p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <ProgressBar current={5} total={8} />
          <Button variant="ghost" size="sm" onClick={reset} className="flex items-center gap-1 ml-4">
            <MujiIcon name="arrow" size={16} />
            처음으로
          </Button>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-muji-dark mb-2">
            시간도둑 순위를 정해주세요
          </h2>
          <p className="text-muji-mid">
            가장 많은 시간을 빼앗아간 순서대로 드래그하여 배치하세요
          </p>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="space-y-4 mb-8">
            <RankSlot rank={1} thief={ranked[0]} />
            <RankSlot rank={2} thief={ranked[1]} />
            <RankSlot rank={3} thief={ranked[2]} />
          </div>

          <UnrankedZone thieves={unranked} />
        </DndContext>

        <div className="text-center mt-8">
          <Button
            size="lg"
            onClick={handleNext}
            disabled={!canProceed}
            className="inline-flex items-center gap-2"
          >
            다음
            <MujiIcon name="arrow-right" size={18} />
          </Button>
          {!canProceed && (
            <p className="text-sm text-muji-mid mt-3">
              3개의 순위를 모두 채워주세요
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const RankSlot: React.FC<{ rank: number; thief: TimeThief | null }> = ({ rank, thief }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `rank-${rank}`,
  });

  const medals = ['medal-gold', 'medal-silver', 'medal-bronze'] as const;
  const colors = ['#c4a574', '#a8a8a8', '#b08968'];

  return (
    <div
      ref={setNodeRef}
      className={`p-6 border-2 rounded transition-all ${
        isOver ? 'border-muji-dark bg-muji-beige' : 'border-muji-beige bg-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MujiIcon name={medals[rank - 1]} size={32} color={colors[rank - 1]} />
          <span className="text-2xl font-light text-muji-dark">{rank}위</span>
        </div>
        {thief ? (
          <DraggableThiefCard thief={thief} />
        ) : (
          <div className="text-muji-mid text-sm">여기에 드래그하세요</div>
        )}
      </div>
    </div>
  );
};

const UnrankedZone: React.FC<{ thieves: TimeThief[] }> = ({ thieves }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'unranked',
  });

  return (
    <div
      ref={setNodeRef}
      className={`border-t border-muji-beige pt-6 transition-colors ${isOver ? 'bg-muji-beige' : ''}`}
    >
      <h3 className="text-sm text-muji-mid mb-4">시간도둑 카드</h3>
      <div className="grid grid-cols-2 gap-3">
        {thieves.map((thief) => (
          <DraggableThiefCard key={thief.id} thief={thief} />
        ))}
      </div>
      {thieves.length === 0 && (
        <p className="text-center text-muji-mid py-8">모든 카드가 순위에 배치되었습니다</p>
      )}
    </div>
  );
};

const DraggableThiefCard: React.FC<{ thief: TimeThief }> = ({ thief }) => {
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
      className="p-3 bg-white border-2 border-muji-beige rounded cursor-move hover:border-muji-mid transition-all"
    >
      <div className="flex items-center gap-2">
        <MujiIcon name="drag" size={14} className="text-muji-mid flex-shrink-0" />
        <p className="text-sm text-muji-dark">{thief.label}</p>
      </div>
    </div>
  );
};
