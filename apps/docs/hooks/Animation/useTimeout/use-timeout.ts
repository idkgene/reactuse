import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTimeoutOptions {
  controls?: boolean;
  callback?: () => void;
}

interface UseTimeoutReturn {
  ready: boolean;
  start: () => void;
  stop: () => void;
}

function useTimeout(
  interval: number | (() => number),
  options: UseTimeoutOptions = {},
): UseTimeoutReturn {
  const { controls = false, callback } = options;

  const [ready, setReady] = useState<boolean>(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef<(() => void) | undefined>(callback);

  const start = useCallback(() => {
    setReady(false);
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    const ms = typeof interval === 'function' ? interval() : interval;

    if (typeof ms !== 'number' || isNaN(ms) || ms < 0) {
      throw new Error('Invalid interval value');
    }

    timeoutRef.current = setTimeout(() => {
      setReady(true);
      if (callbackRef.current) {
        callbackRef.current();
      }
    }, ms);
  }, [interval]);

  const stop = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setReady(true);
  }, []);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!controls) {
      start();
    }
    return () => {
      stop();
    };
  }, [controls, start, stop]);

  return { ready, start, stop };
}

export { useTimeout };
export type { UseTimeoutOptions, UseTimeoutReturn };
