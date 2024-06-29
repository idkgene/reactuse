import { useCallback, useEffect, useRef, useState } from 'react';

export type Fn = () => void;

export type Resolvable<T> = T | (() => T);

export interface Pausable {
  isActive: boolean;
  pause: () => void;
  resume: () => void;
}

export interface UseIntervalFnOptions {
  immediate?: boolean;
  immediateCallback?: boolean;
}

export function useIntervalFn(
  callback: Fn,
  interval: Resolvable<number> = 1000,
  options?: UseIntervalFnOptions,
): Pausable {
  if (typeof callback !== 'function') {
    throw new Error('useIntervalFn: callback must be a function');
  }

  const { immediate = true, immediateCallback = false } = options ?? {};

  const [isActive, setIsActive] = useState(immediate);
  const savedCallback = useRef<Fn>(callback);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (isActive) {
      const intervalValue =
        typeof interval === 'function' ? interval() : interval;

      if (typeof intervalValue !== 'number' || intervalValue <= 0) {
        throw new Error(
          'useIntervalFn: interval must resolve to a positive number',
        );
      }

      intervalRef.current = setInterval(() => {
        try {
          savedCallback.current();
        } catch (error) {
          console.error('useIntervalFn: Error in callback:', error);
        }
      }, intervalValue);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, interval]);

  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  const resume = useCallback(() => {
    setIsActive(true);
    if (immediateCallback) {
      try {
        savedCallback.current();
      } catch (error) {
        console.error('useIntervalFn: Error in immediate callback:', error);
      }
    }
  }, [immediateCallback]);

  return { isActive, pause, resume };
}
