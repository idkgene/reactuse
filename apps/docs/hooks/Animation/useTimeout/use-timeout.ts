import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTimeoutOptions {
  controls?: boolean;
  callback?: () => void;
  autoStart?: boolean;
}

interface UseTimeoutReturn {
  isReady: boolean;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

function useTimeout(
  interval: number | (() => number),
  options: UseTimeoutOptions = {},
): UseTimeoutReturn {
  const { controls = false, callback, autoStart = true } = options;

  const [isReady, setIsReady] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef<(() => void) | undefined>(callback);
  const intervalRef = useRef<number | (() => number)>(interval);

  const getInterval = useCallback((): number => {
    const ms =
      typeof intervalRef.current === 'function'
        ? intervalRef.current()
        : intervalRef.current;
    if (typeof ms !== 'number' || isNaN(ms) || ms < 0) {
      throw new Error('Invalid interval value');
    }
    return ms;
  }, []);

  const clearTimeoutSafely = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearTimeoutSafely();
    setIsReady(false);
    setIsRunning(true);

    timeoutRef.current = setTimeout(() => {
      setIsReady(true);
      setIsRunning(false);
      if (callbackRef.current) {
        callbackRef.current();
      }
    }, getInterval());
  }, [clearTimeoutSafely, getInterval]);

  const stop = useCallback(() => {
    clearTimeoutSafely();
    setIsReady(false);
    setIsRunning(false);
  }, [clearTimeoutSafely]);

  const reset = useCallback(() => {
    stop();
    start();
  }, [start, stop]);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    intervalRef.current = interval;
  }, [interval]);

  useEffect(() => {
    if (!controls && autoStart) {
      start();
    }
    return () => {
      clearTimeoutSafely();
    };
  }, [controls, autoStart, start, clearTimeoutSafely]);

  return { isReady, isRunning, start, stop, reset };
}

export { useTimeout };
