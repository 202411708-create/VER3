// src/components/timeline/TimeInputForm.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MujiIcon } from '../common/MujiIcon';
import { useAppStore } from '../../store/appStore';
import type { ActivityCategory, TimeEntry } from '../../types';
import { ACTIVITY_COLORS } from '../../utils/constants';
import { detectTimeOverlap, calculateEndTime } from '../../utils/timeCalculator';

interface TimeInputFormProps {
  category: ActivityCategory;
  editingEntry: TimeEntry | null;
  onClose: () => void;
}

export const TimeInputForm: React.FC<TimeInputFormProps> = ({
  category,
  editingEntry,
  onClose,
}) => {
  const { addTimeEntry, updateTimeEntry, timeEntries } = useAppStore();

  const [startHour, setStartHour] = useState(editingEntry?.startHour ?? 0);
  const [startMinute, setStartMinute] = useState(editingEntry?.startMinute ?? 0);
  const [durationHours, setDurationHours] = useState(
    editingEntry ? Math.floor(editingEntry.duration / 60) : 1
  );
  const [durationMinutes, setDurationMinutes] = useState(
    editingEntry ? editingEntry.duration % 60 : 0
  );
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const duration = durationHours * 60 + durationMinutes;

    if (duration === 0) {
      setError('활동 시간은 0분보다 커야 합니다');
      return;
    }

    const newEntry: TimeEntry = {
      id: editingEntry?.id ?? Date.now().toString(),
      category: editingEntry?.category ?? category,
      startHour,
      startMinute,
      duration,
      color: ACTIVITY_COLORS[editingEntry?.category ?? category],
    };

    const otherEntries = editingEntry
      ? timeEntries.filter((e) => e.id !== editingEntry.id)
      : timeEntries;

    if (detectTimeOverlap(newEntry, otherEntries)) {
      setError('이 시간대에 이미 다른 활동이 기록되어 있습니다');
      return;
    }

    if (editingEntry) {
      updateTimeEntry(editingEntry.id, {
        startHour,
        startMinute,
        duration,
      });
    } else {
      addTimeEntry(newEntry);
    }

    onClose();
  };

  const endTime = calculateEndTime(startHour, startMinute, durationHours * 60 + durationMinutes);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <Card padding="lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-muji-dark">
              {editingEntry ? '활동 수정' : '활동 추가'}
            </h3>
            <button
              onClick={onClose}
              className="text-muji-mid hover:text-muji-dark"
            >
              <MujiIcon name="close" size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-muji-dark mb-2">
                카테고리
              </label>
              <div className={`px-4 py-2 rounded ${ACTIVITY_COLORS[editingEntry?.category ?? category]} text-white font-medium`}>
                {editingEntry?.category ?? category}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-muji-dark mb-2">
                  시작 시간
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={startHour}
                    onChange={(e) => setStartHour(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-muji-mid rounded focus:outline-none focus:ring-2 focus:ring-muji-dark"
                  />
                  <span className="flex items-center text-muji-dark">:</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={startMinute}
                    onChange={(e) => setStartMinute(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-muji-mid rounded focus:outline-none focus:ring-2 focus:ring-muji-dark"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muji-dark mb-2">
                  소요 시간
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={durationHours}
                    onChange={(e) => setDurationHours(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-muji-mid rounded focus:outline-none focus:ring-2 focus:ring-muji-dark"
                    placeholder="시간"
                  />
                  <span className="flex items-center text-muji-dark text-xs">시간</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    step="5"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-muji-mid rounded focus:outline-none focus:ring-2 focus:ring-muji-dark"
                    placeholder="분"
                  />
                  <span className="flex items-center text-muji-dark text-xs">분</span>
                </div>
              </div>
            </div>

            <div className="mb-4 p-3 bg-muji-beige rounded">
              <p className="text-sm text-muji-dark">
                종료 시간:{' '}
                <span className="font-medium">
                  {endTime.hour.toString().padStart(2, '0')}:
                  {endTime.minute.toString().padStart(2, '0')}
                </span>
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded flex items-start">
                <MujiIcon name="warning" size={20} className="text-red-600 mr-2 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="flex space-x-3">
              <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                취소
              </Button>
              <Button type="submit" className="flex-1">
                {editingEntry ? '수정' : '추가'}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};
