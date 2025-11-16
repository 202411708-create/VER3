// src/types/index.ts

export type ActivityCategory =
  | '수면'
  | '공부'
  | '식사'
  | 'SNS'
  | '게임'
  | '운동'
  | '기타';

export interface TimeEntry {
  id: string;
  category: ActivityCategory;
  startHour: number;    // 0-23
  startMinute: number;  // 0-59
  duration: number;     // 분 단위
  color: string;        // Tailwind 색상 클래스명
}

export interface UnaccountedTime {
  id: string;
  type: '이동시간' | '멍때림' | '휴식' | '기억안남';
  customLabel?: string;
  duration: number;
}

export interface TimeThief {
  id: string;
  label: string;
  category: 'steal' | 'ok' | 'uncategorized';
}

export interface AppState {
  currentStep: 1 | 2 | 3 | 4 | 5 | 6;
  timeEntries: TimeEntry[];
  unaccountedTimes: UnaccountedTime[];
  timeThieves: TimeThief[];
}
