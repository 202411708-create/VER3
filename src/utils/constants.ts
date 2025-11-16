// src/utils/constants.ts

import type { ActivityCategory, TimeThief } from '../types';

export const ACTIVITY_COLORS: Record<ActivityCategory, string> = {
  수면: 'bg-gray-700',
  공부: 'bg-blue-500',
  식사: 'bg-orange-400',
  SNS: 'bg-pink-400',
  게임: 'bg-purple-500',
  운동: 'bg-green-500',
  기타: 'bg-amber-400',
};

export const ACTIVITY_TEXT_COLORS: Record<ActivityCategory, string> = {
  수면: 'text-gray-700',
  공부: 'text-blue-500',
  식사: 'text-orange-400',
  SNS: 'text-pink-400',
  게임: 'text-purple-500',
  운동: 'text-green-500',
  기타: 'text-amber-400',
};

export const ACTIVITY_BORDER_COLORS: Record<ActivityCategory, string> = {
  수면: 'border-gray-700',
  공부: 'border-blue-500',
  식사: 'border-orange-400',
  SNS: 'border-pink-400',
  게임: 'border-purple-500',
  운동: 'border-green-500',
  기타: 'border-amber-400',
};

export const DEFAULT_TIME_THIEVES: TimeThief[] = [
  { id: '1', label: '알람 끄고 또 5분만 더', category: 'uncategorized' },
  { id: '2', label: '숙제 시작 전 책상 정리', category: 'uncategorized' },
  { id: '3', label: '저 배우 이름이 뭐였지?', category: 'uncategorized' },
  { id: '4', label: '그만하기엔 너무 재미있어', category: 'uncategorized' },
  { id: '5', label: '배고프지 않은데도 냉장고', category: 'uncategorized' },
  { id: '6', label: '잠깐만 확인하려고 했는데...', category: 'uncategorized' },
  { id: '7', label: 'TV 틀었다니 재미있는 프로그램', category: 'uncategorized' },
  { id: '8', label: '숙제가 너무 어려워서', category: 'uncategorized' },
  { id: '9', label: '친구 문자 온 거 확인하다가', category: 'uncategorized' },
  { id: '10', label: '이건 봐야 돼! 딱 하나만 더', category: 'uncategorized' },
];

export const CATEGORIES: ActivityCategory[] = [
  '수면',
  '공부',
  '식사',
  'SNS',
  '게임',
  '운동',
  '기타',
];
