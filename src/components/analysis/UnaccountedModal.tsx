// src/components/analysis/UnaccountedModal.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MujiIcon } from '../common/MujiIcon';
import { useAppStore } from '../../store/appStore';
import type { UnaccountedTime } from '../../types';

interface UnaccountedModalProps {
  onClose: () => void;
}

export const UnaccountedModal: React.FC<UnaccountedModalProps> = ({ onClose }) => {
  const { addUnaccountedTime, unaccountedTimes } = useAppStore();
  const [selectedType, setSelectedType] = useState<UnaccountedTime['type'] | null>(null);
  const [customLabel, setCustomLabel] = useState('');

  const handleAdd = () => {
    if (!selectedType && !customLabel) {
      return;
    }

    const newTime: UnaccountedTime = {
      id: Date.now().toString(),
      type: selectedType || '기억안남',
      customLabel: customLabel || undefined,
      duration: 0, // 시간은 기록하지 않음
    };

    addUnaccountedTime(newTime);
    setSelectedType(null);
    setCustomLabel('');
  };

  const typeOptions: UnaccountedTime['type'][] = ['휴식', '멍때림', '이동시간'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <Card padding="lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-muji-dark">활동 추가하기</h3>
            <button
              onClick={onClose}
              className="text-muji-mid hover:text-muji-dark"
            >
              <MujiIcon name="close" size={24} />
            </button>
          </div>

          <p className="text-sm text-muji-mid mb-4">
            기록되지 않은 시간에 어떤 활동을 했는지 추가해주세요
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-muji-dark mb-2">
              활동 선택
            </label>
            <div className="grid grid-cols-3 gap-2">
              {typeOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setCustomLabel('');
                  }}
                  className={`p-3 rounded border-2 transition-all ${
                    selectedType === type
                      ? 'border-muji-dark bg-muji-beige'
                      : 'border-muji-beige hover:border-muji-mid'
                  }`}
                >
                  <span className="text-sm font-medium text-muji-dark">{type}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="my-4 flex items-center">
            <div className="flex-1 border-t border-muji-beige" />
            <span className="px-3 text-sm text-muji-mid">또는</span>
            <div className="flex-1 border-t border-muji-beige" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-muji-dark mb-2">
              직접 입력
            </label>
            <input
              type="text"
              value={customLabel}
              onChange={(e) => {
                setCustomLabel(e.target.value);
                setSelectedType(null);
              }}
              placeholder="예: 샤워, 준비하기 등"
              className="w-full px-3 py-2 border border-muji-mid rounded focus:outline-none focus:ring-2 focus:ring-muji-dark"
            />
          </div>

          {unaccountedTimes.length > 0 && (
            <div className="mb-4 p-3 bg-muji-beige rounded">
              <h4 className="text-sm font-medium text-muji-dark mb-2">
                추가된 활동:
              </h4>
              <ul className="space-y-1 text-sm text-muji-mid">
                {unaccountedTimes.map((time) => (
                  <li key={time.id}>
                    • {time.customLabel || time.type}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex space-x-3">
            <Button
              variant="secondary"
              onClick={handleAdd}
              disabled={!selectedType && !customLabel}
              className="flex-1"
            >
              + 추가하기
            </Button>
            <Button onClick={onClose} className="flex-1">
              완료
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
