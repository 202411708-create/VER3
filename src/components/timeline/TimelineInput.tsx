// src/components/timeline/TimelineInput.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MujiIcon } from '../common/MujiIcon';
import { ProgressBar } from '../common/ProgressBar';
import { TimeInputForm } from './TimeInputForm';
import { TimelineCanvas } from './TimelineCanvas';
import { useAppStore } from '../../store/appStore';
import { CATEGORIES, ACTIVITY_COLORS, ACTIVITY_BORDER_COLORS } from '../../utils/constants';
import { calculateTotalMinutes, minutesToHours } from '../../utils/timeCalculator';
import type { ActivityCategory, TimeEntry } from '../../types';

export const TimelineInput: React.FC = () => {
  const { timeEntries, setStep, reset } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>('수면');
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);

  const totalMinutes = calculateTotalMinutes(timeEntries);

  const handleAddActivity = () => {
    setEditingEntry(null);
    setShowForm(true);
  };

  const handleEditActivity = (entry: TimeEntry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingEntry(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-muji-bg p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <ProgressBar current={2} total={7} />

        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-muji-dark mb-2">
              어제는 어떻게 보냈을까?
            </h2>
            <p className="text-muji-mid">
              어제 하루 동안 한 활동을 시간대별로 기록해보세요
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={reset} className="flex items-center gap-1">
            <MujiIcon name="arrow" size={16} />
            처음으로
          </Button>
        </div>

        <Card padding="lg" className="mb-6">
          <h3 className="text-sm font-medium text-muji-mid mb-3">카테고리 선택</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border-2 ${
                  selectedCategory === category
                    ? `${ACTIVITY_COLORS[category]} text-white ${ACTIVITY_BORDER_COLORS[category]}`
                    : `bg-white ${ACTIVITY_BORDER_COLORS[category]} text-muji-dark hover:bg-muji-beige`
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <Button variant="secondary" onClick={handleAddActivity}>
            + 활동 추가하기
          </Button>
        </Card>

        <Card padding="lg" className="mb-6">
          <h3 className="text-sm font-medium text-muji-mid mb-3">
            24시간 타임라인
            <span className="text-xs text-muji-light ml-2">
              (타임라인을 드래그하여 활동 추가)
            </span>
          </h3>
          <TimelineCanvas
            entries={timeEntries}
            onEditEntry={handleEditActivity}
            selectedCategory={selectedCategory}
          />
        </Card>

        <Card padding="lg" className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-muji-mid">기록된 활동</h3>
            <div className="text-sm text-muji-dark font-medium">
              총 {minutesToHours(totalMinutes)} / 24시간
            </div>
          </div>
          <div className="space-y-2">
            {timeEntries.length === 0 ? (
              <p className="text-center text-muji-mid py-8">
                아직 기록된 활동이 없습니다. 활동을 추가해보세요!
              </p>
            ) : (
              timeEntries.map((entry) => (
                <ActivityListItem
                  key={entry.id}
                  entry={entry}
                  onEdit={handleEditActivity}
                />
              ))
            )}
          </div>
        </Card>

        <div className="text-center">
          <Button
            size="lg"
            onClick={() => setStep(3)}
            disabled={timeEntries.length === 0}
          >
            다음 →
          </Button>
        </div>
      </div>

      {showForm && (
        <TimeInputForm
          category={selectedCategory}
          editingEntry={editingEntry}
          onClose={handleFormClose}
        />
      )}
    </motion.div>
  );
};

const ActivityListItem: React.FC<{
  entry: TimeEntry;
  onEdit: (entry: TimeEntry) => void;
}> = ({ entry, onEdit }) => {
  const removeTimeEntry = useAppStore((state) => state.removeTimeEntry);
  const endTime = (entry.startHour * 60 + entry.startMinute + entry.duration) % 1440;
  const endHour = Math.floor(endTime / 60);
  const endMinute = endTime % 60;

  return (
    <div className="flex items-center justify-between p-3 border border-muji-beige rounded hover:bg-muji-beige transition-colors">
      <div className="flex items-center space-x-3 flex-1">
        <div className={`w-3 h-3 rounded-full ${entry.color}`} />
        <span className="font-medium text-muji-dark">{entry.category}</span>
        <span className="text-sm text-muji-mid">
          {entry.startHour.toString().padStart(2, '0')}:
          {entry.startMinute.toString().padStart(2, '0')} -{' '}
          {endHour.toString().padStart(2, '0')}:
          {endMinute.toString().padStart(2, '0')}
        </span>
        <span className="text-sm text-muji-mid">
          ({minutesToHours(entry.duration)})
        </span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(entry)}
          className="text-sm text-muji-blue hover:text-muji-dark"
        >
          수정
        </button>
        <button
          onClick={() => removeTimeEntry(entry.id)}
          className="text-sm text-muji-red hover:text-muji-dark"
        >
          삭제
        </button>
      </div>
    </div>
  );
};
