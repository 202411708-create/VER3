// src/components/timethief/TimeThiefGame.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { DndContext, closestCenter } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';
import { DropZone } from './DropZone';
import { useAppStore } from '../../store/appStore';

export const TimeThiefGame: React.FC = () => {
  const { timeThieves, setTimeThiefCategory, setStep } = useAppStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const category = over.id as 'steal' | 'ok' | 'uncategorized';
      setTimeThiefCategory(active.id as string, category);
    }
  };

  const uncategorized = timeThieves.filter((t) => t.category === 'uncategorized');
  const steal = timeThieves.filter((t) => t.category === 'steal');
  const ok = timeThieves.filter((t) => t.category === 'ok');

  const allCategorized = uncategorized.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-muji-bg p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <ProgressBar current={4} total={5} />

        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-muji-dark mb-2">
            시간도둑을 잡아라
          </h2>
          <p className="text-muji-mid">
            나의 시간을 훔쳐가는 행동들을 분류해봅시다
          </p>
        </div>

        <Card padding="lg" className="mb-6 bg-blue-50 border-blue-200">
          <p className="text-sm text-muji-dark">
            💡 각 카드를 드래그하여 왼쪽(시간을 많이 뺏겼어요) 또는 오른쪽(별로 빼앗기지 않았어요)으로 분류해주세요.
            <br />
            모든 카드를 분류하면 다음 단계로 넘어갈 수 있습니다.
          </p>
        </Card>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <DropZone
              id="steal"
              title="시간을 많이 뺏겼어요"
              description="드래그하여 분류해보세요"
              items={steal}
              color="red"
            />

            <DropZone
              id="uncategorized"
              title="시간도둑 카드"
              description={
                uncategorized.length > 0
                  ? `${uncategorized.length}개 카드를 분류해주세요`
                  : '모든 카드를 분류했습니다! 👏'
              }
              items={uncategorized}
              color="gray"
            />

            <DropZone
              id="ok"
              title="별로 빼앗기지 않았어요"
              description="드래그하여 분류해보세요"
              items={ok}
              color="green"
            />
          </div>
        </DndContext>

        {!allCategorized && (
          <Card padding="md" className="mb-6 bg-yellow-50 border-yellow-300">
            <p className="text-sm text-center text-muji-dark">
              ⚠️ 아직 {uncategorized.length}개의 카드가 분류되지 않았습니다.
              모든 카드를 분류해주세요.
            </p>
          </Card>
        )}

        <div className="text-center">
          <Button size="lg" onClick={() => setStep(6)} disabled={!allCategorized}>
            다음 →
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
