// src/components/report/FinalReflection.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MujiIcon } from '../common/MujiIcon';
import { useAppStore } from '../../store/appStore';
import {
  calculateUnaccountedMinutes,
  minutesToHours,
} from '../../utils/timeCalculator';

export const FinalReflection: React.FC = () => {
  const { timeEntries, reset } = useAppStore();
  const unaccountedMinutes = calculateUnaccountedMinutes(timeEntries);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-muji-bg p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <motion.div variants={item}>
            <Card padding="lg" className="bg-muji-blue-light bg-opacity-30 border-muji-blue">
              <div className="flex items-start gap-3 mb-4">
                <MujiIcon name="thinking" size={28} className="text-muji-blue flex-shrink-0" />
                <h2 className="text-xl font-light text-muji-dark">생각해볼 질문</h2>
              </div>
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

          <motion.div variants={item}>
            <Card padding="lg">
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

          <motion.div variants={item} className="text-center">
            <Card padding="lg" className="bg-muji-beige mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <MujiIcon name="check" size={24} className="text-muji-green" />
                <p className="text-lg text-muji-dark font-light">
                  오늘 당신은 시간의 주인이 되는 첫걸음을 뗐습니다.
                </p>
              </div>
            </Card>

            <Button size="lg" variant="secondary" onClick={reset} className="inline-flex items-center gap-2">
              <MujiIcon name="arrow-right" size={18} />
              처음부터 다시 시작하기
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
