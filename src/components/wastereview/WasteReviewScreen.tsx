// src/components/wastereview/WasteReviewScreen.tsx

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAppStore } from '../../store/appStore';
import { Button } from '../common/Button';

export const WasteReviewScreen: React.FC = () => {
  const {
    timeEntries,
    wastedTimeIds,
    toggleWastedTime,
    getTotalWastedMinutes,
    setStep,
    reset,
  } = useAppStore();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(getTotalWastedMinutes());
  }, [wastedTimeIds, getTotalWastedMinutes]);

  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0 && m > 0) return `${h}시간 ${m}분`;
    if (h > 0) return `${h}시간`;
    return `${m}분`;
  };

  const formatTimeRange = (startHour: number, startMinute: number, duration: number) => {
    const endMinutes = startHour * 60 + startMinute + duration;
    const endHour = Math.floor(endMinutes / 60) % 24;
    const endMinute = endMinutes % 60;

    const start = `${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`;
    const end = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;

    return `${start} ~ ${end}`;
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
      exit={{ opacity: 0 }}
      className="h-screen bg-muji-bg flex flex-col"
    >
      {/* 헤더 */}
      <div className="flex-shrink-0 p-4 md:p-6 border-b border-muji-beige bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-light text-muji-dark mb-2">
            낭비된 시간을 찾아보세요
          </h1>
          <p className="text-sm md:text-base text-muji-mid font-light">
            어제 기록한 활동 중 불필요하게 낭비되었다고 생각하는 시간을 체크해주세요
          </p>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* 합계 카드 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-muji-dark text-white p-6 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-light opacity-90">선택된 낭비 시간</span>
              <span className="text-3xl font-medium">
                {formatTime(total)}
              </span>
            </div>
          </motion.div>

          {/* 타임라인 리스트 */}
          <div className="space-y-2">
            {sortedEntries.length === 0 ? (
              <div className="text-center py-12 text-muji-mid">
                <p className="text-lg font-light">아직 기록된 활동이 없습니다</p>
              </div>
            ) : (
              sortedEntries.map((entry, index) => {
                const checked = wastedTimeIds.includes(entry.id);

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <button
                      onClick={() => toggleWastedTime(entry.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        checked
                          ? 'bg-muji-dark text-white border-muji-dark'
                          : 'bg-white border-muji-beige hover:border-muji-mid'
                      }`}
                      aria-label={`${entry.category} 활동 ${checked ? '선택 해제' : '선택'}`}
                    >
                      <div className="flex items-start gap-3">
                        {/* 체크박스 */}
                        <div
                          className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center mt-0.5 ${
                            checked
                              ? 'bg-white border-white'
                              : 'bg-transparent border-muji-mid'
                          }`}
                        >
                          {checked && (
                            <svg
                              className="w-4 h-4 text-muji-dark"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>

                        {/* 활동 정보 */}
                        <div className="flex-1">
                          <div className="text-lg font-medium mb-1">{entry.category}</div>
                          <div className={`text-sm ${checked ? 'text-white/80' : 'text-muji-mid'}`}>
                            {formatTimeRange(entry.startHour, entry.startMinute, entry.duration)}
                            {' '}
                            ({formatTime(entry.duration)})
                          </div>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex-shrink-0 p-4 md:p-6 bg-white border-t border-muji-beige">
        <div className="max-w-3xl mx-auto flex gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className="flex-shrink-0"
          >
            처음으로
          </Button>
          <Button
            variant="primary"
            onClick={() => setStep(7)}
            disabled={wastedTimeIds.length === 0}
            className="flex-1"
          >
            확정하고 리포트 보기
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
