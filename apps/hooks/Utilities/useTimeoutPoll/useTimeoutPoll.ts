import { useState, useCallback, useEffect, useRef } from 'react';
import { UseTimeoutPollOptions, Pausable } from '../utilities';

/**
 * Polls a given asynchronous function at specified intervals with control over pausing and resuming.
 *
 * @param {() => Promise<void>} fn - The asynchronous function to be polled.
 * @param {number} interval - The polling interval in milliseconds.
 * @param {UseTimeoutPollOptions} [options] - Options to control the polling behavior.
 * @param {boolean} [options.immediate=true] - Whether to start polling immediately.
 * @returns {Pausable} An object with control over the polling state.
 *
 * @example
 * Example usage with immediate start
 * const { pause, resume } = useTimeoutPoll(async () => {
 *   console.log('Polling...');
 * }, 1000);
 *
 * Example usage with immediate set to false
 * const { isActive, pause, resume } = useTimeoutPoll(async () => {
 *   console.log('Polling...');
 * }, 2000, { immediate: false });
 */
export function useTimeoutPoll(
  fn: () => Promise<void>,
  interval: number,
  options?: UseTimeoutPollOptions
): Pausable {
  const { immediate = true } = options || {};

  const [isActive, setIsActive] = useState(immediate);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const execute = useCallback(async () => {
    if (!isActive) return;
    await fn();
    if (isActive) {
      timeoutRef.current = setTimeout(execute, interval);
    }
  }, [fn, interval, isActive]);

  const pause = useCallback(() => {
    setIsActive(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    if (!isActive) {
      setIsActive(true);
      timeoutRef.current = setTimeout(execute, interval);
    }
  }, [execute, interval, isActive]);

  useEffect(() => {
    if (immediate) {
      timeoutRef.current = setTimeout(execute, interval);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [execute, interval, immediate]);

  return { isActive, pause, resume };
}
