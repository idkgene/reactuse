import { useCallback, useEffect, useRef, useState } from 'react';

type IntervalFnCallback = () => void;
type IntervalValue = number | (() => number);

interface IntervalFnOptions {
  immediate?: boolean;
  immediateCallback?: boolean;
}

interface IntervalFnControl {
  isActive: boolean;
  pause: () => void;
  resume: () => void;
}

function useIntervalFn(
  callback: IntervalFnCallback,
  interval: IntervalValue,
  options: IntervalFnOptions = {},
): IntervalFnControl {
  const { immediate = true, immediateCallback = false } = options;

  const [isActive, setIsActive] = useState<boolean>(immediate);
  const savedCallback = useRef<IntervalFnCallback>(callback);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const executeCallback = useCallback((): void => {
    savedCallback.current();
  }, []);

  useEffect(() => {
    if (!isActive) return;

    if (immediateCallback) {
      executeCallback();
    }

    const intervalValue =
      typeof interval === 'function' ? interval() : interval;

    if (typeof intervalValue !== 'number' || intervalValue <= 0) {
      throw new RangeError('useIntervalFn: interval must be a positive number');
    }

    intervalRef.current = window.setInterval(executeCallback, intervalValue);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, interval, immediateCallback, executeCallback]);

  const pause = useCallback((): void => {
    setIsActive(false);
  }, []);

  const resume = useCallback((): void => {
    setIsActive(true);
  }, []);

  return { isActive, pause, resume };
}

export { useIntervalFn };
export type { IntervalFnCallback, IntervalValue, IntervalFnOptions };
