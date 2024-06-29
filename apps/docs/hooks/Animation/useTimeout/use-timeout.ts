import { useCallback, useEffect, useRef, useState } from 'react';

type CallbackFn = () => void;

interface UseTimeoutFnOptions {
  immediate?: boolean;
}

interface UseTimeoutOptions<Controls extends boolean>
  extends UseTimeoutFnOptions {
  controls?: Controls;
  callback?: CallbackFn;
}

interface Stoppable {
  start: () => void;
  stop: () => void;
}

type UseTimeoutReturn<Controls extends boolean> = Controls extends true
  ? { ready: boolean } & Stoppable
  : boolean;

export function useTimeout<Controls extends boolean = false>(
  interval: number | (() => number),
  options?: UseTimeoutOptions<Controls>,
): UseTimeoutReturn<Controls> {
  const { immediate = true, controls = false, callback } = options ?? {};
  const [ready, setReady] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setReady(false);
  }, []);

  const start = useCallback(() => {
    setReady(false);
    stop();
    const delay = typeof interval === 'function' ? interval() : interval;
    timeoutRef.current = window.setTimeout(() => {
      setReady(true);
      callback?.();
    }, delay);
  }, [interval, stop, callback]);

  useEffect(() => {
    if (immediate) {
      start();
    }

    return () => {
      stop();
    };
  }, [immediate, start, stop]);

  const controlFunctions = useCallback(
    () => ({
      start: () => {
        stop();
        start();
      },
      stop,
    }),
    [start, stop],
  );

  if (controls) {
    return {
      ready,
      ...controlFunctions(),
    } as UseTimeoutReturn<Controls>;
  }

  return ready as UseTimeoutReturn<Controls>;
}
