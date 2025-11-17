// src/store/appStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, TimeEntry, UnaccountedTime, TimeThief } from '../types';
import { DEFAULT_TIME_THIEVES } from '../utils/constants';

interface AppStore extends AppState {
  setStep: (step: AppState['currentStep']) => void;
  addTimeEntry: (entry: TimeEntry) => void;
  removeTimeEntry: (id: string) => void;
  updateTimeEntry: (id: string, updates: Partial<TimeEntry>) => void;
  addUnaccountedTime: (time: UnaccountedTime) => void;
  removeUnaccountedTime: (id: string) => void;
  setTimeThiefCategory: (id: string, category: TimeThief['category']) => void;
  setTimeThieves: (thieves: TimeThief[]) => void;
  toggleWastedTime: (id: string) => void;
  setWastedTime: (entryId: string, minutes: number) => void;
  getTotalWastedMinutes: () => number;
  reset: () => void;
}

const initialState: AppState = {
  currentStep: 1,
  timeEntries: [],
  unaccountedTimes: [],
  timeThieves: DEFAULT_TIME_THIEVES,
  wastedTimeIds: [],
  wastedTimeDetails: {},
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...initialState,

      setStep: (step) => set({ currentStep: step }),

      addTimeEntry: (entry) =>
        set((state) => ({
          timeEntries: [...state.timeEntries, entry],
        })),

      removeTimeEntry: (id) =>
        set((state) => ({
          timeEntries: state.timeEntries.filter((e) => e.id !== id),
        })),

      updateTimeEntry: (id, updates) =>
        set((state) => ({
          timeEntries: state.timeEntries.map((e) =>
            e.id === id ? { ...e, ...updates } : e
          ),
        })),

      addUnaccountedTime: (time) =>
        set((state) => ({
          unaccountedTimes: [...state.unaccountedTimes, time],
        })),

      removeUnaccountedTime: (id) =>
        set((state) => ({
          unaccountedTimes: state.unaccountedTimes.filter((t) => t.id !== id),
        })),

      setTimeThiefCategory: (id, category) =>
        set((state) => ({
          timeThieves: state.timeThieves.map((t) =>
            t.id === id ? { ...t, category } : t
          ),
        })),

      setTimeThieves: (thieves) => set({ timeThieves: thieves }),

      toggleWastedTime: (id) =>
        set((state) => ({
          wastedTimeIds: state.wastedTimeIds.includes(id)
            ? state.wastedTimeIds.filter((i) => i !== id)
            : [...state.wastedTimeIds, id],
        })),

      setWastedTime: (entryId, minutes) =>
        set((state) => ({
          wastedTimeDetails: {
            ...state.wastedTimeDetails,
            [entryId]: minutes,
          },
        })),

      getTotalWastedMinutes: (): number => {
        const state = useAppStore.getState();
        return Object.values(state.wastedTimeDetails).reduce(
          (sum, minutes) => sum + minutes,
          0
        );
      },

      reset: () => set(initialState),
    }),
    { name: 'time-detective-storage' }
  )
);
