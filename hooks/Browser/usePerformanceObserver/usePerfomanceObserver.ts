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
  callback: PerformanceObserverCallback
): {
  isSupported: boolean;
  start: () => void;
  stop: () => void;
} {
  const isSupported = typeof PerformanceObserver !== 'undefined';
  const observerRef = useRef<PerformanceObserver | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const start = useCallback(() => {
    if (!isSupported || isRunning) return;

    const observer = new PerformanceObserver(callback);
    observer.observe(options);
    observerRef.current = observer;
    setIsRunning(true);
  }, [isSupported, isRunning, options, callback]);

  const stop = useCallback(() => {
    if (!isSupported || !isRunning) return;

    observerRef.current?.disconnect();
    observerRef.current = null;
    setIsRunning(false);
  }, [isSupported, isRunning]);

  useEffect(() => {
    if (options.immediate) {
      start();
    }

    return () => {
      stop();
    };
  }, [options.immediate, start, stop]);

  return {
    isSupported,
    start,
    stop,
  };
}
