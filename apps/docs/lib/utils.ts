import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function toKebabCase(str: string): string {
  try {
    return str
      .split('')
      .map((letter, idx) => {
        return letter.toUpperCase() === letter
          ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
          : letter;
      })
      .join('');
  } catch (e) {
    console.error('Error in toKebabCase:', e);
    return str.toLowerCase();
  }
}

export const formatStatus = (isRunning: boolean): string =>
  isRunning ? 'Running' : 'Paused';

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);
