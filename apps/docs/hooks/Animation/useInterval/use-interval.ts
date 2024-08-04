import { useCallback, useEffect, useRef, useState } from 'react';

interface IntervalSettings {
  immediate?: boolean;
  callback?: (count: number) => void;
  maxCount?: number;
}

interface IntervalControls {
  counter: number;
  isRunning: boolean;
  reset: () => void;
  pause: () => void;
  resume: () => void;
  setCounter: (value: number) => void;
}

function useInterval(
  interval: number,
  options?: IntervalSettings,
): IntervalControls {
  if (typeof interval !== 'number' || interval <= 0) {
    throw new Error('useInterval: interval must be a positive number');
  }

  const { immediate = true, callback, maxCount } = options ?? {};

  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(immediate);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const savedCallback = useRef<((count: number) => void) | undefined>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const reset = useCallback((): void => {
    setCounter(0);
  }, []);

  const pause = useCallback((): void => {
    setIsRunning(false);
  }, []);

  const resume = useCallback((): void => {
    setIsRunning(true);
  }, []);

  const setCounterSafe = useCallback((value: number): void => {
    if (typeof value !== 'number' || value < 0) {
      throw new Error(
        'useInterval: counter value must be a non-negative number',
      );
    }
    setCounter(value);
  }, []);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCounter((prevCounter) => {
        const newCounter = prevCounter + 1;
        if (maxCount !== undefined && newCounter > maxCount) {
          setIsRunning(false);
          return prevCounter;
        }
        try {
          savedCallback.current?.(newCounter);
        } catch (error) {
          console.error('useInterval: Error in callback:', error);
        }
        return newCounter;
      });
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [interval, isRunning, maxCount]);

  return {
    counter,
    isRunning,
    reset,
    pause,
    resume,
    setCounter: setCounterSafe,
  };
}

export { useInterval };
export type { IntervalSettings, IntervalControls };
