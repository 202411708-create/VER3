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
  startHour: number;
  startMinute: number;
  duration: number;
  color: string;
  isWasted?: boolean;
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
  rank?: number | null;
}

export interface TimelineEntry {
  id: string;
  startTime: string;
  endTime: string;
  activity: string;
}

export interface AppState {
  currentStep: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  timeEntries: TimeEntry[];
  unaccountedTimes: UnaccountedTime[];
  timeThieves: TimeThief[];
  wastedTimeIds: string[];
  wastedTimeDetails: { [entryId: string]: number };
}
