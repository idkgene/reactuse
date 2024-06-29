import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseIntervalOptions {
  immediate?: boolean;
  callback?: (count: number) => void;
}

export interface UseIntervalControls {
  counter: number;
  reset: () => void;
  pause: () => void;
  resume: () => void;
}

export function useInterval(
  interval: number,
  options?: UseIntervalOptions,
): UseIntervalControls {
  if (typeof interval !== 'number' || interval <= 0) {
    throw new Error('useInterval: interval must be a positive number');
  }

  const { immediate = true, callback } = options ?? {};

  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(immediate);
  const savedCallback = useRef<((count: number) => void) | undefined>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const reset = useCallback(() => {
    setCounter(0);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    setIsRunning(true);
  }, []);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const id = setInterval(() => {
      setCounter((prevCounter) => {
        const newCounter = prevCounter + 1;
        try {
          savedCallback.current?.(newCounter);
        } catch (error) {
          console.error('useInterval: Error in callback:', error);
        }
        return newCounter;
      });
    }, interval);

    return () => {
      clearInterval(id);
    };
  }, [interval, isRunning]);

  return { counter, reset, pause, resume };
}
