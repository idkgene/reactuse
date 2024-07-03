import { useCallback, useEffect, useRef, useState } from 'react';

interface UseTimeoutFnOptions {
  immediate?: boolean;
}

type TimeoutCallback<T extends unknown[]> = (...args: T) => void;

interface UseTimeoutFnReturn<T extends unknown[]> {
  isPending: boolean;
  start: (...args: T) => void;
  stop: () => void;
}

function useTimeoutFn<T extends unknown[]>(
  callback: TimeoutCallback<T>,
  interval: number | (() => number),
  options: UseTimeoutFnOptions = {},
): UseTimeoutFnReturn<T> {
  const { immediate = true } = options;

  const [isPending, setIsPending] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef<TimeoutCallback<T>>(callback);
  const argsRef = useRef<T | undefined>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const stop = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsPending(false);
  }, []);

  const start = useCallback(
    (...args: T | []) => {
      if (typeof interval !== 'number' && typeof interval !== 'function') {
        throw new Error(
          'Interval must be a number or a function returning a number',
        );
      }

      argsRef.current = args.length ? (args as T) : undefined;
      stop();
      setIsPending(true);

      const delay = typeof interval === 'function' ? interval() : interval;

      if (delay < 0) {
        throw new Error('Interval must be a non-negative number');
      }

      timeoutRef.current = setTimeout(() => {
        setIsPending(false);
        if (argsRef.current) {
          callbackRef.current(...argsRef.current);
        } else {
          callbackRef.current(...([] as unknown as T));
        }
      }, delay);
    },
    [interval, stop],
  );

  useEffect(() => {
    if (immediate) {
      start();
    }
    return stop;
  }, [immediate, start, stop]);

  return { isPending, start, stop };
}

export default useTimeoutFn;
export type { UseTimeoutFnOptions, UseTimeoutFnReturn };
