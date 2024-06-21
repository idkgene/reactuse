import { useCallback, useEffect, useRef } from 'react';

export interface UseTimeoutFnOptions {
  /**
   * Start the timer immediate after calling this function
   *
   * @default true
   */
  immediate?: boolean;
}

export interface Stoppable<CallbackArgs extends any[]> {
  isPending: boolean;
  start: (...args: CallbackArgs) => void;
  stop: () => void;
}

/**
 * Wrapper for `setTimeout` with controls.
 *
 * @param cb - The callback function to be invoked after the timeout
 * @param interval - The timeout interval in milliseconds
 * @param options - Options for the useTimeoutFn hook
 * @returns An object with `isPending` state and `start` and `stop` functions to control the timeout
 */
export function useTimeoutFn<CallbackFn extends (...args: any[]) => void>(
  cb: CallbackFn,
  interval: number | (() => number),
  options?: UseTimeoutFnOptions
): Stoppable<Parameters<CallbackFn>> {
  const { immediate = true } = options || {};
  const timeoutRef = useRef<number | null>(null);
  const callbackRef = useRef<CallbackFn>(cb);
  const isPendingRef = useRef(false);

  const stop = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      isPendingRef.current = false;
    }
  }, []);

  const start = useCallback(
    (...args: Parameters<CallbackFn>): void => {
      stop();
      isPendingRef.current = true;
      const delay = typeof interval === 'function' ? interval() : interval;
      timeoutRef.current = window.setTimeout(() => {
        callbackRef.current(...(args.length > 0 ? args : []));
        isPendingRef.current = false;
      }, delay);
    },
    [interval, stop]
  );

  useEffect(() => {
    callbackRef.current = cb;
  }, [cb]);

  useEffect(() => {
    if (immediate) {
      start();
    }

    return () => {
      stop();
    };
  }, [immediate, start, stop]);

  return {
    isPending: isPendingRef.current,
    start,
    stop,
  };
}
