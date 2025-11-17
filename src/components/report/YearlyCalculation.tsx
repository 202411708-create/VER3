// src/components/report/YearlyCalculation.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MujiIcon } from '../common/MujiIcon';
import { ProgressBar } from '../common/ProgressBar';
import { useAppStore } from '../../store/appStore';

export const YearlyCalculation: React.FC = () => {
  const { timeThieves, getTotalWastedMinutes, setStep, reset } = useAppStore();

  // ✅ 반드시 getTotalWastedMinutes()만 사용
  const wastedMinutes = getTotalWastedMinutes();
  const wastedHours = wastedMinutes / 60;
  const wastedDays = wastedHours / 24;

  // 1년 환산
  const yearlyWastedHours = wastedHours * 365;
  const yearlyWastedDays = wastedDays * 365;

  const stealThieves = timeThieves.filter((t) => t.category === 'steal');
  const rankedThieves = stealThieves
    .filter((t) => t.rank)
    .sort((a, b) => (a.rank || 0) - (b.rank || 0));

  const formatTime = (min: number) => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return h > 0 ? `${h}시간 ${m}분` : `${m}분`;
  };

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

        {rankedThieves.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
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
                    <span className="text-2xl">
                      {['🥇', '🥈', '🥉'][index]}
                    </span>
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
          transition={{ delay: 0.4 }}
        >
          <Card padding="lg" className="mb-8 bg-white border-2 border-muji-dark">
            <div className="flex items-center gap-3 mb-6">
              <MujiIcon name="chart" size={28} className="text-muji-dark" />
              <h2 className="text-xl font-light text-muji-dark">1년으로 환산하면</h2>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className="mb-3">
                  <div className="text-muji-mid mb-1">하루</div>
                  <div className="text-3xl font-light text-[#d4a574]">
                    {formatTime(wastedMinutes)}
                  </div>
                </div>

                <div className="text-muji-mid my-2">은</div>

                <div className="mb-3">
                  <div className="text-muji-mid mb-1">한 달이면</div>
                  <div className="text-3xl font-light text-[#d4a574]">
                    {Math.round(yearlyWastedHours / 12)}시간
                  </div>
                </div>

                <div>
                  <div className="text-muji-mid mb-1">1년이면</div>
                  <div className="text-4xl font-light text-[#d4a574]">
                    {Math.round(yearlyWastedDays)}일
                  </div>
                  <div className="text-muji-mid mt-1">
                    ({Math.round(yearlyWastedHours)}시간)
                  </div>
                </div>
              </div>

              <div className="border-t border-muji-beige pt-4 mt-4">
                <p className="text-sm font-medium text-muji-dark mb-2 flex items-center gap-2">
                  <MujiIcon name="lightbulb" size={16} />
                  이 시간으로 할 수 있는 것:
                </p>
                <ul className="space-y-1 text-sm text-muji-mid pl-4">
                  <li>• 주 5일 기준, 연간 {Math.round(yearlyWastedHours / 8 / 5)}주치 근무시간</li>
                  <li>• 전문 자격증 {Math.round(yearlyWastedHours / 960 * 10) / 10}개 취득 가능한 시간</li>
                  <li>• 새로운 언어 하나를 마스터할 수 있는 시간</li>
                  <li>• 책 {Math.round(yearlyWastedHours / 6)}권을 읽을 수 있는 시간</li>
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
