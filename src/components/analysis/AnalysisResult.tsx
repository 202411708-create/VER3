// src/components/analysis/AnalysisResult.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MujiIcon } from '../common/MujiIcon';
import { ProgressBar } from '../common/ProgressBar';
import { PieChartComponent } from './PieChart';
import { UnaccountedModal } from './UnaccountedModal';
import { useAppStore } from '../../store/appStore';
import {
  calculateTotalMinutes,
  calculateUnaccountedMinutes,
  minutesToHours,
} from '../../utils/timeCalculator';
import type { ActivityCategory } from '../../types';

export const AnalysisResult: React.FC = () => {
  const { timeEntries, setStep, reset, unaccountedTimes } = useAppStore();
  const [showModal, setShowModal] = useState(false);

  const totalMinutes = calculateTotalMinutes(timeEntries);
  const unaccountedMinutes = calculateUnaccountedMinutes(timeEntries);

  const categoryTotals: Record<ActivityCategory, number> = {
    수면: 0,
    공부: 0,
    식사: 0,
    SNS: 0,
    게임: 0,
    운동: 0,
    기타: 0,
  };

  timeEntries.forEach((entry) => {
    categoryTotals[entry.category] += entry.duration;
  });

  const chartData = Object.entries(categoryTotals)
    .filter(([_, minutes]) => minutes > 0)
    .map(([category, minutes]) => ({
      name: category,
      value: minutes,
      percentage: ((minutes / 1440) * 100).toFixed(1),
    }));

  if (unaccountedMinutes > 0) {
    chartData.push({
      name: '미지의 시간',
      value: unaccountedMinutes,
      percentage: ((unaccountedMinutes / 1440) * 100).toFixed(1),
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-muji-bg p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <ProgressBar current={3} total={7} />

        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-muji-dark mb-2">
              시간 사용 분석
            </h2>
            <p className="text-muji-mid">
              어제 하루를 어떻게 보냈는지 확인해보세요
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={reset} className="flex items-center gap-1">
            <MujiIcon name="arrow" size={16} />
            처음으로
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card padding="lg">
            <h3 className="text-lg font-medium text-muji-dark mb-4">
              시간 사용 비율
            </h3>
            <PieChartComponent data={chartData} />
          </Card>

          <Card padding="lg">
            <h3 className="text-lg font-medium text-muji-dark mb-4">
              전체 기록 시간
            </h3>
            <div className="text-center mb-6">
              <div className="text-5xl font-light text-muji-dark mb-2">
                {minutesToHours(totalMinutes)}
              </div>
              <div className="text-sm text-muji-mid">
                / 24시간 중 {((totalMinutes / 1440) * 100).toFixed(0)}%
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(categoryTotals)
                .filter(([_, minutes]) => minutes > 0)
                .map(([category, minutes]) => (
                  <div
                    key={category}
                    className="flex justify-between items-center pb-2 border-b border-muji-beige"
                  >
                    <span className="text-muji-dark font-medium">{category}</span>
                    <span className="text-muji-mid">{minutesToHours(minutes)}</span>
                  </div>
                ))}
            </div>
          </Card>
        </div>

        {unaccountedMinutes > 0 && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card padding="lg" className="mb-6 border-2 border-muji-yellow bg-muji-yellow bg-opacity-20">
              <div className="flex items-start space-x-4">
                <MujiIcon name="warning" size={40} className="text-muji-orange flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-muji-dark mb-2">
                    기록되지 않은 시간
                  </h3>
                  <p className="text-muji-dark mb-4">
                    하루 중 <span className="font-medium text-xl text-muji-red">{minutesToHours(unaccountedMinutes)}</span>은 기록되지 않았습니다.
                  </p>
                  <p className="text-sm text-muji-mid mb-3">
                    이 시간은{' '}
                    {unaccountedTimes.length > 0 ? (
                      <>
                        {unaccountedTimes.map((item, index) => (
                          <span key={item.id}>
                            <span className="font-medium text-muji-dark">
                              {item.customLabel || item.type}
                            </span>
                            {index < unaccountedTimes.length - 1 && ', '}
                          </span>
                        ))}
                      </>
                    ) : (
                      '휴식, 멍때림, 이동시간'
                    )}
                    , 또는 기억나지 않는 활동일 수 있습니다.
                  </p>
                  <Button variant="secondary" onClick={() => setShowModal(true)}>
                    + 추가 기록하기
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        <div className="text-center">
          <Button size="lg" onClick={() => setStep(4)} className="inline-flex items-center gap-2">
            다음
            <MujiIcon name="arrow-right" size={18} />
          </Button>
        </div>
      </div>

      {showModal && <UnaccountedModal onClose={() => setShowModal(false)} />}
    </motion.div>
  );
};
