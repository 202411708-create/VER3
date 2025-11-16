// src/components/onboarding/WelcomeScreen.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MujiIcon } from '../common/MujiIcon';
import { useAppStore } from '../../store/appStore';

export const WelcomeScreen: React.FC = () => {
  const setStep = useAppStore((state) => state.setStep);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-muji-bg flex items-center justify-center p-4"
    >
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <MujiIcon name="search" size={40} className="text-muji-dark" />
            <h1 className="text-4xl md:text-5xl font-light text-muji-dark">
              시간탐정
            </h1>
          </div>
          <p className="text-xl text-muji-mid font-light">나의 시간을 찾아라</p>
        </div>

        <Card padding="lg" className="mb-6">
          <p className="text-muji-dark leading-relaxed mb-4">
            안녕하세요.
          </p>
          <p className="text-muji-dark leading-relaxed mb-4">
            이 프로그램은 나의 시간 사용 습관을 알아보는 시간입니다.
            게임처럼 재미있게 참여하면서, 내가 하루를 어떻게 보내는지, 어떤 행동들이 시간을 빼앗아 가는지 발견할 수 있습니다.
          </p>
        </Card>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card padding="lg" className="h-full border-l-4 border-l-muji-blue">
              <div className="flex items-center gap-2 mb-2">
                <MujiIcon name="clock" size={20} className="text-muji-blue" />
                <h3 className="text-lg font-medium text-muji-dark">
                  미션 1: 시간여행 타임라인
                </h3>
              </div>
              <p className="text-sm text-muji-mid">
                어제 하루를 돌아보며 시간대별로 활동을 기록합니다
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card padding="lg" className="h-full border-l-4 border-l-muji-pink">
              <div className="flex items-center gap-2 mb-2">
                <MujiIcon name="search" size={20} className="text-muji-pink" />
                <h3 className="text-lg font-medium text-muji-dark">
                  미션 2: 시간도둑 찾기
                </h3>
              </div>
              <p className="text-sm text-muji-mid">
                나의 시간을 훔쳐가는 행동들을 찾아 분류합니다
              </p>
            </Card>
          </motion.div>
        </div>

        <Card padding="lg" className="mb-8 bg-muji-beige border-muji-mid">
          <h3 className="text-lg font-medium text-muji-dark mb-4">참여 방법</h3>
          <ul className="space-y-2 text-muji-dark">
            <li className="flex items-start gap-2">
              <MujiIcon name="check" size={16} className="text-muji-mid mt-0.5 flex-shrink-0" />
              <span>정답이 없습니다. 솔직하게 나의 하루를 기록해주세요</span>
            </li>
            <li className="flex items-start gap-2">
              <MujiIcon name="check" size={16} className="text-muji-mid mt-0.5 flex-shrink-0" />
              <span>실수해도 괜찮습니다. 언제든지 수정할 수 있습니다</span>
            </li>
            <li className="flex items-start gap-2">
              <MujiIcon name="check" size={16} className="text-muji-mid mt-0.5 flex-shrink-0" />
              <span>드래그하고 클릭하면서 재미있게 참여하세요</span>
            </li>
            <li className="flex items-start gap-2">
              <MujiIcon name="check" size={16} className="text-muji-mid mt-0.5 flex-shrink-0" />
              <span>자동으로 저장되니 걱정하지 않아도 됩니다</span>
            </li>
          </ul>
        </Card>

        <div className="text-center">
          <Button size="lg" onClick={() => setStep(2)} className="inline-flex items-center gap-2">
            시작하기
            <MujiIcon name="play" size={18} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
