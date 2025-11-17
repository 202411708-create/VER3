// src/components/wastereview/WasteReviewScreen.tsx

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAppStore } from '../../store/appStore';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { ProgressBar } from '../common/ProgressBar';
import { MujiIcon } from '../common/MujiIcon';

export const WasteReviewScreen: React.FC = () => {
  const {
    timeEntries,
    wastedTimeDetails,
    setWastedTime,
    getTotalWastedMinutes,
    setStep,
  } = useAppStore();

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [totalWasted, setTotalWasted] = useState(0);

  useEffect(() => {
    setTotalWasted(getTotalWastedMinutes());
  }, [wastedTimeDetails, getTotalWastedMinutes]);

  const formatTime = (min: number) => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return h > 0 ? `${h}시간 ${m}분` : `${m}분`;
  };

  const calculateDuration = (entry: any) => {
    return entry.duration;
  };

  const formatTimeRange = (entry: any) => {
    const startMinutes = entry.startHour * 60 + entry.startMinute;
    const endMinutes = startMinutes + entry.duration;
    const startH = entry.startHour;
    const startM = entry.startMinute;
    const endH = Math.floor(endMinutes / 60) % 24;
    const endM = endMinutes % 60;

    return `${String(startH).padStart(2, '0')}:${String(startM).padStart(2, '0')} ~ ${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
  };

  const handleSliderChange = (entryId: string, value: number) => {
    setWastedTime(entryId, value);
  };

  const sortedEntries = [...timeEntries].sort((a, b) => {
    const aMinutes = a.startHour * 60 + a.startMinute;
    const bMinutes = b.startHour * 60 + b.startMinute;
    return aMinutes - bMinutes;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-muji-bg p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <ProgressBar current={6} total={8} />
          <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="flex items-center gap-1 ml-4">
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
            낭비된 시간을 찾아보세요
          </h1>
          <p className="text-muji-mid">
            각 활동에서 얼마나 낭비했는지 슬라이더로 조절해주세요
          </p>
        </motion.div>

        <div className="space-y-6">

          {/* 합계 카드 */}
          <Card className="bg-white border-2 border-muji-dark">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muji-mid">총 낭비 시간</span>
              <motion.span
                key={totalWasted}
                className="text-2xl font-medium text-muji-dark"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                {formatTime(totalWasted)}
              </motion.span>
            </div>
          </Card>

          {/* 타임라인 리스트 */}
          <div className="space-y-3">
            {sortedEntries.map((entry) => {
              const duration = calculateDuration(entry);
              const wastedMinutes = wastedTimeDetails[entry.id] || 0;
              const isExpanded = expandedId === entry.id;
              const hasWaste = wastedMinutes > 0;

              return (
                <motion.div key={entry.id} layout>
                  <Card
                    className={`cursor-pointer transition-all ${
                      hasWaste
                        ? 'border-2 border-muji-dark'
                        : 'border border-muji-beige hover:border-muji-mid'
                    }`}
                    onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                  >
                    {/* 기본 정보 */}
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-muji-dark truncate">
                          {entry.category}
                        </div>
                        <div className="text-sm text-muji-mid">
                          {formatTimeRange(entry)}
                          {' '}
                          (총 {formatTime(duration)})
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {hasWaste && (
                          <span className="text-sm font-medium text-muji-dark">
                            {formatTime(wastedMinutes)} 낭비
                          </span>
                        )}
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg
                            className="w-5 h-5 text-muji-mid"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>

                    {/* 확장 영역: 슬라이더 */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-muji-beige space-y-3">
                            <label className="block text-sm text-muji-mid">
                              이 활동에서 낭비한 시간: <strong className="text-muji-dark">{formatTime(wastedMinutes)}</strong>
                            </label>

                            {/* 슬라이더 */}
                            <input
                              type="range"
                              min="0"
                              max={duration}
                              value={wastedMinutes}
                              onChange={(e) => handleSliderChange(entry.id, Number(e.target.value))}
                              className="w-full h-2 bg-muji-beige rounded-lg appearance-none cursor-pointer accent-muji-dark"
                              onClick={(e) => e.stopPropagation()}
                            />

                            {/* 양 끝 레이블 */}
                            <div className="flex justify-between text-xs text-muji-mid">
                              <span>0분</span>
                              <span>{formatTime(duration)}</span>
                            </div>

                            {/* 빠른 선택 버튼 */}
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSliderChange(entry.id, 0);
                                }}
                                className="flex-1 px-3 py-2 text-xs border border-muji-beige rounded hover:border-muji-mid transition-colors"
                              >
                                낭비 없음
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSliderChange(entry.id, Math.floor(duration / 2));
                                }}
                                className="flex-1 px-3 py-2 text-xs border border-muji-beige rounded hover:border-muji-mid transition-colors"
                              >
                                절반
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSliderChange(entry.id, duration);
                                }}
                                className="flex-1 px-3 py-2 text-xs border border-muji-beige rounded hover:border-muji-mid transition-colors"
                              >
                                전체
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-8">
          <Button
            size="lg"
            onClick={() => setStep(7)}
            disabled={totalWasted === 0}
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
