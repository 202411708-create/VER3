// src/utils/timeCalculator.ts

import type { TimeEntry } from '../types';

export function calculateTotalMinutes(entries: TimeEntry[]): number {
  return entries.reduce((sum, entry) => sum + entry.duration, 0);
}

export function calculateUnaccountedMinutes(entries: TimeEntry[]): number {
  return 1440 - calculateTotalMinutes(entries);
}

export function minutesToHours(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}시간 ${mins}분` : `${hours}시간`;
}

export function detectTimeOverlap(
  newEntry: TimeEntry,
  existingEntries: TimeEntry[]
): boolean {
  const newStart = newEntry.startHour * 60 + newEntry.startMinute;
  const newEnd = newStart + newEntry.duration;

  return existingEntries.some((entry) => {
    if (entry.id === newEntry.id) return false;
    const start = entry.startHour * 60 + entry.startMinute;
    const end = start + entry.duration;
    return newStart < end && newEnd > start;
  });
}

export function formatTime(hour: number, minute: number): string {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

export function calculateEndTime(
  startHour: number,
  startMinute: number,
  duration: number
): { hour: number; minute: number } {
  const totalMinutes = startHour * 60 + startMinute + duration;
  const hour = Math.floor(totalMinutes / 60) % 24;
  const minute = totalMinutes % 60;
  return { hour, minute };
}
