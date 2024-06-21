import { useCallback, useEffect, useRef, useState } from 'react';

export type UsePerformanceObserverOptions = PerformanceObserverInit & {
  /**
   * Start the observer immediate.
   *
   * @default true
   */
  immediate?: boolean;
};

export function usePerformanceObserver(
  options: UsePerformanceObserverOptions,
  callback: PerformanceObserverCallback,
) {
  const isSupported = typeof PerformanceObserver !== 'undefined';
  const observerRef = useRef<PerformanceObserver | null>(null);
  const runningRef = useRef(false);

  const start = useCallback(() => {
    if (!isSupported || runningRef.current) return;

    observerRef.current = new PerformanceObserver(callback);
    observerRef.current.observe(options);
    runningRef.current = true;
  }, []);

  const stop = useCallback(() => {
    if (!isSupported || !runningRef.current) return;

    observerRef.current?.disconnect();
    observerRef.current = null;
    runningRef.current = false;
  }, []);

  useEffect(() => {
    if (options.immediate) start();
    return stop;
  }, []);

  return { isSupported, start, stop };
}
