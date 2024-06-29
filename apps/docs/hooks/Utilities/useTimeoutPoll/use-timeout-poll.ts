import { useState, useCallback, useEffect, useRef } from 'react';
import { type UseTimeoutPollOptions, type Pausable } from '../utilities';

export function useTimeoutPoll(
  fn: () => Promise<void>,
  interval: number,
  options?: UseTimeoutPollOptions,
): Pausable {
  const { immediate = true } = options ?? {};

  const [isActive, setIsActive] = useState(immediate);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const execute = useCallback(async () => {
    if (!isActive) return;
    
    try {
      await fn();
    } catch (error) {
      console.error('Error during polling:', error);
    }

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
