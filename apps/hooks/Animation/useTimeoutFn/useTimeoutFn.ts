import { useCallback, useEffect, useRef, useState } from 'react';

interface UseTimeoutFnOptions {
  immediate?: boolean;
}

interface UseTimeoutFnReturn<T extends (...args: any[]) => any> {
  isPending: boolean;
  start: (...args: Parameters<T>) => void;
  stop: () => void;
}

function useTimeoutFn<T extends (...args: any[]) => any>(
  callback: T,
  interval: number | (() => number),
  options: UseTimeoutFnOptions = {},
): UseTimeoutFnReturn<T> {
  const { immediate = true } = options;
  const [isPending, setIsPending] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef<T>(callback);
  const argsRef = useRef<Parameters<T>>();

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
    (...args: Parameters<T>) => {
      argsRef.current = args;
      stop();
      setIsPending(true);
      timeoutRef.current = setTimeout(
        () => {
          setIsPending(false);
          callbackRef.current(...(argsRef.current as Parameters<T>));
        },
        typeof interval === 'function' ? interval() : interval,
      );
    },
    [interval, stop],
  );

  useEffect(() => {
    if (immediate) {
      start(...([] as unknown as Parameters<T>));
    }
    return stop;
  }, [immediate, start, stop]);

  return { isPending, start, stop };
}

export default useTimeoutFn;
