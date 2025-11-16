// src/components/report/FinalReport.tsx

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';
import { SortableThiefItem } from './SortableThiefItem';
import { useAppStore } from '../../store/appStore';
import {
  calculateTotalMinutes,
  calculateUnaccountedMinutes,
  minutesToHours,
} from '../../utils/timeCalculator';

export const FinalReport: React.FC = () => {
  const { timeEntries, timeThieves, reset } = useAppStore();
  const [rankedThieves, setRankedThieves] = useState<typeof timeThieves>([]);

  const totalMinutes = calculateTotalMinutes(timeEntries);
  const unaccountedMinutes = calculateUnaccountedMinutes(timeEntries);
  const stealThieves = timeThieves.filter((t) => t.category === 'steal');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    setRankedThieves(stealThieves);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setRankedThieves((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const yearlyUnaccountedHours = Math.round((unaccountedMinutes / 60) * 365);
  const yearlyUnaccountedDays = Math.round(yearlyUnaccountedHours / 24);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-muji-bg p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <ProgressBar current={5} total={5} />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-muji-dark mb-4">
            당신의 24시간,
            <br />
            이제 보이나요?
          </h1>
        </motion.div>

        {rankedThieves.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card padding="lg" className="mb-8">
              <h2 className="text-xl font-bold text-muji-dark mb-4">
                시간도둑 순위 정하기
              </h2>
              <p className="text-sm text-muji-mid mb-4">
                드래그하여 가장 시간을 많이 빼앗긴 순서대로 정렬해보세요
              </p>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={rankedThieves.map((t) => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {rankedThieves.map((thief, index) => (
                      <SortableThiefItem
                        key={thief.id}
                        thief={thief}
                        rank={index + 1}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card padding="lg" className="mb-8">
            <h2 className="text-xl font-bold text-muji-dark mb-6 text-center">
              🕐 당신의 하루 24시간
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  <CountUpNumber target={totalMinutes / 60} />시간
                </div>
                <div className="text-sm text-muji-mid">기록한 시간</div>
                <div className="text-xs text-muji-mid mt-1">
                  ({((totalMinutes / 1440) * 100).toFixed(0)}%)
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600 mb-2">
                  <CountUpNumber target={unaccountedMinutes / 60} />시간
                </div>
                <div className="text-sm text-muji-mid">미지의 시간</div>
                <div className="text-xs text-muji-mid mt-1">
                  ({((unaccountedMinutes / 1440) * 100).toFixed(0)}%)
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-muji-dark mb-2">
                  <CountUpNumber target={stealThieves.length} />개
                </div>
                <div className="text-sm text-muji-mid">시간도둑 발견</div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card padding="lg" className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50">
            <h3 className="text-lg font-bold text-muji-dark mb-4 text-center">
              📊 1년으로 환산하면
            </h3>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-muji-dark mb-2">
                  하루 <span className="font-bold text-xl text-red-600">{minutesToHours(unaccountedMinutes)}</span>은
                </p>
                <div className="flex justify-center items-baseline space-x-2">
                  <span className="text-muji-mid">한 달이면</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {Math.round((unaccountedMinutes / 60) * 30)}시간
                  </span>
                </div>
                <div className="flex justify-center items-baseline space-x-2 mt-2">
                  <span className="text-muji-mid">1년이면</span>
                  <span className="text-3xl font-bold text-red-600">
                    {yearlyUnaccountedDays}일
                  </span>
                  <span className="text-muji-mid">({yearlyUnaccountedHours}시간)</span>
                </div>
              </div>

              <div className="border-t border-muji-beige pt-4">
                <p className="text-sm font-medium text-muji-dark mb-2">
                  💡 이 시간으로 할 수 있는 것:
                </p>
                <ul className="space-y-1 text-sm text-muji-mid pl-4">
                  <li>• 주 5일 기준, 연간 {Math.round(yearlyUnaccountedHours / 8)}일치 근무시간</li>
                  <li>• 전문 자격증 2~3개 취득 가능한 시간</li>
                  <li>• 새로운 언어 하나를 마스터할 수 있는 시간</li>
                  <li>• 책 {Math.round(yearlyUnaccountedHours / 3)}권을 읽을 수 있는 시간</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card padding="lg" className="mb-8 bg-blue-50">
            <h3 className="text-lg font-bold text-muji-dark mb-4">💭 생각해볼 질문</h3>
            <div className="space-y-4 text-muji-dark">
              <p className="leading-relaxed">
                • 미지의 {minutesToHours(unaccountedMinutes)} 중 1시간만 회복한다면 무엇을 하시겠습니까?
              </p>
              <p className="leading-relaxed">
                • 당신의 시간도둑은 정말 '휴식'이었나요?
              </p>
              <p className="leading-relaxed">
                • 내일은 어떤 하루를 만들고 싶으신가요?
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Card padding="lg" className="mb-8">
            <div className="space-y-6 text-center text-muji-dark">
              <p className="text-lg leading-relaxed">
                "시간을 완벽하게 쓰는 사람은 없습니다.
                <br />
                하지만 당신은 오늘, 자신의 시간을 마주했습니다."
              </p>
              <p className="text-lg leading-relaxed">
                "시간은 돈처럼 벌 수 없습니다.
                <br />
                하지만 돈처럼 관리할 수는 있습니다."
              </p>
              <p className="text-lg leading-relaxed font-medium">
                "이 프로그램을 1주일 후 다시 해보세요.
                <br />
                미지의 시간이 줄어들었다면,
                <br />
                당신은 성장하고 있는 겁니다."
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mb-8"
        >
          <p className="text-lg text-muji-mid mb-6">
            오늘 당신은 시간의 주인이 되는 첫걸음을 뗐습니다.
          </p>
          <Button size="lg" onClick={reset}>
            처음부터 다시 시작하기
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const CountUpNumber: React.FC<{ target: number }> = ({ target }) => {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, {
      duration: 2,
      onUpdate: (latest) => setDisplayValue(Math.round(latest * 10) / 10),
    });

    return controls.stop;
  }, [target]);

  return <>{displayValue}</>;
};
