import { useCallback, useEffect, useRef, useState } from 'react';

const ERROR_MESSAGES = {
  NON_POSITIVE_INTERVAL: 'Interval must be a positive number',
  CALLBACK_ERROR: 'An error occurred in the interval callback',
};

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
  reset: () => void;
  setInterval: (interval: IntervalValue) => void;
  setCallback: (callback: IntervalFnCallback) => void;
  getCurrentInterval: () => number;
}

function useIntervalFn(
  initialCallback: IntervalFnCallback,
  initialInterval: IntervalValue,
  options: IntervalFnOptions = {},
): IntervalFnControl {
  const { immediate = true, immediateCallback = false } = options;

  const [isActive, setIsActive] = useState(immediate);
  const callbackRef = useRef(initialCallback);
  const intervalRef = useRef<IntervalValue>(initialInterval);
  const timerRef = useRef<number | null>(null);

  const getCurrentInterval = useCallback((): number => {
    const interval =
      typeof intervalRef.current === 'function'
        ? intervalRef.current()
        : intervalRef.current;

    if (typeof interval !== 'number' || interval <= 0) {
      throw new RangeError(ERROR_MESSAGES.NON_POSITIVE_INTERVAL);
    }

    return interval;
  }, []);

  const executeCallback = useCallback(() => {
    try {
      callbackRef.current();
    } catch (error) {
      console.error(ERROR_MESSAGES.CALLBACK_ERROR, error);
    }
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const setTimer = useCallback(() => {
    clearTimer();
    if (isActive) {
      timerRef.current = window.setInterval(
        executeCallback,
        getCurrentInterval(),
      );
    }
  }, [isActive, getCurrentInterval, executeCallback, clearTimer]);

  useEffect(() => {
    if (immediateCallback && isActive) {
      executeCallback();
    }
    setTimer();
    return clearTimer;
  }, [isActive, immediateCallback, setTimer, clearTimer, executeCallback]);

  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  const resume = useCallback(() => {
    setIsActive(true);
  }, []);
  
  const reset = useCallback(() => {
    clearTimer();
    setIsActive(immediate);
    setTimer();
  }, [immediate, clearTimer, setTimer]);

  const setInterval = useCallback(
    (newInterval: IntervalValue) => {
      intervalRef.current = newInterval;
      if (isActive) setTimer();
    },
    [isActive, setTimer],
  );

  const setCallback = useCallback((newCallback: IntervalFnCallback) => {
    callbackRef.current = newCallback;
  }, []);

  return {
    isActive,
    pause,
    resume,
    reset,
    setInterval,
    setCallback,
    getCurrentInterval,
  };
}

export { useIntervalFn };
export type {
  IntervalFnCallback,
  IntervalValue,
  IntervalFnOptions,
  IntervalFnControl,
};
