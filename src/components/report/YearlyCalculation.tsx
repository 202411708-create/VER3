// src/components/report/YearlyCalculation.tsx

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MujiIcon } from '../common/MujiIcon';
import { ProgressBar } from '../common/ProgressBar';
import { useAppStore } from '../../store/appStore';
import {
  calculateTotalMinutes,
  calculateUnaccountedMinutes,
  minutesToHours,
} from '../../utils/timeCalculator';

export const YearlyCalculation: React.FC = () => {
  const { timeEntries, timeThieves, setStep, reset } = useAppStore();

  const totalMinutes = calculateTotalMinutes(timeEntries);
  const unaccountedMinutes = calculateUnaccountedMinutes(timeEntries);
  const stealThieves = timeThieves.filter((t) => t.category === 'steal');
  const rankedThieves = stealThieves
    .filter((t) => t.rank)
    .sort((a, b) => (a.rank || 0) - (b.rank || 0));

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
        <div className="flex justify-between items-center mb-6">
          <ProgressBar current={7} total={8} />
          <Button variant="ghost" size="sm" onClick={reset} className="flex items-center gap-1 ml-4">
            <MujiIcon name="arrow" size={16} />
            처음으로
          </Button>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-light text-muji-dark mb-4">
            당신의 24시간,
            <br />
            이제 보이나요?
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card padding="lg" className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <MujiIcon name="clock" size={28} className="text-muji-dark" />
              <h2 className="text-xl font-light text-muji-dark">당신의 하루 24시간</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-light text-muji-blue mb-2">
                  <CountUpNumber target={totalMinutes / 60} />시간
                </div>
                <div className="text-sm text-muji-mid">기록한 시간</div>
                <div className="text-xs text-muji-mid mt-1">
                  ({((totalMinutes / 1440) * 100).toFixed(0)}%)
                </div>
              </div>
              <div>
                <div className="text-3xl font-light text-muji-red mb-2">
                  <CountUpNumber target={unaccountedMinutes / 60} />시간
                </div>
                <div className="text-sm text-muji-mid">미지의 시간</div>
                <div className="text-xs text-muji-mid mt-1">
                  ({((unaccountedMinutes / 1440) * 100).toFixed(0)}%)
                </div>
              </div>
              <div>
                <div className="text-3xl font-light text-muji-dark mb-2">
                  <CountUpNumber target={stealThieves.length} />개
                </div>
                <div className="text-sm text-muji-mid">시간도둑 발견</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {rankedThieves.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card padding="lg" className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <MujiIcon name="trophy" size={24} className="text-muji-dark" />
                <h3 className="text-lg font-light text-muji-dark">시간도둑 TOP 3</h3>
              </div>
              <div className="space-y-3">
                {rankedThieves.slice(0, 3).map((thief, index) => (
                  <div
                    key={thief.id}
                    className="flex items-center gap-3 p-3 border border-muji-beige rounded"
                  >
                    <MujiIcon
                      name={['medal-gold', 'medal-silver', 'medal-bronze'][index] as any}
                      size={24}
                      color={['#c4a574', '#a8a8a8', '#b08968'][index]}
                    />
                    <span className="text-muji-dark">{thief.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card padding="lg" className="mb-8 bg-muji-yellow bg-opacity-20 border-muji-yellow">
            <div className="flex items-center gap-3 mb-4">
              <MujiIcon name="chart" size={24} className="text-muji-dark" />
              <h3 className="text-lg font-light text-muji-dark">1년으로 환산하면</h3>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-muji-dark mb-2">
                  하루 <span className="font-medium text-xl text-muji-red">{minutesToHours(unaccountedMinutes)}</span>은
                </p>
                <div className="flex justify-center items-baseline space-x-2">
                  <span className="text-muji-mid">한 달이면</span>
                  <span className="text-2xl font-light text-muji-orange">
                    {Math.round((unaccountedMinutes / 60) * 30)}시간
                  </span>
                </div>
                <div className="flex justify-center items-baseline space-x-2 mt-2">
                  <span className="text-muji-mid">1년이면</span>
                  <span className="text-3xl font-light text-muji-red">
                    {yearlyUnaccountedDays}일
                  </span>
                  <span className="text-muji-mid">({yearlyUnaccountedHours}시간)</span>
                </div>
              </div>

              <div className="border-t border-muji-beige pt-4">
                <p className="text-sm font-medium text-muji-dark mb-2 flex items-center gap-2">
                  <MujiIcon name="lightbulb" size={16} />
                  이 시간으로 할 수 있는 것:
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

        <div className="text-center">
          <Button
            size="lg"
            onClick={() => setStep(8)}
            className="inline-flex items-center gap-2"
          >
            다음
            <MujiIcon name="arrow-right" size={18} />
          </Button>
        </div>
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
