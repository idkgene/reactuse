import { useRef, useCallback } from 'react';
import {
  FunctionArgs,
  PromiseType,
  CallbackType,
  DebounceFilterOptions,
} from '../utilities';

/**
 * Returns a debounced version of a function that delays invoking until after a specified time interval.
 * Provides options for controlling maximum wait time and rejection on cancellation.
 *
 * @template T - The argument types of the function.
 * @param {CallbackType<T>} fn - The function to be debounced.
 * @param {number} [ms=200] - The debounce interval in milliseconds.
 * @param {DebounceFilterOptions} [options={}] - Additional options for the debounce behavior.
 * @param {number} [options.maxWait=0] - The maximum wait time in milliseconds before forcing the function to execute.
 * @param {boolean} [options.rejectOnCancel=false] - Whether to reject the promise when the function execution is cancelled.
 * @returns {PromiseType<T>} The debounced function that returns a promise.
 *
 * @example
 * const debouncedLog = useDebounceFn((message: string) => console.log(message));
 * debouncedLog('Hello, world!');
 */
function useDebounceFn<T extends FunctionArgs>(
  fn: CallbackType<T>,
  ms = 200,
  options: DebounceFilterOptions = {}
): PromiseType<T> {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const maxWaitRef = useRef<ReturnType<typeof setTimeout>>();
  const lastCallTimeRef = useRef<number>(0);
  const lastCallArgsRef = useRef<T>();
  const lastInvokeRef = useRef<number>(0);
  const pendingRef = useRef(false);

  const { maxWait = 0, rejectOnCancel = false } = options;

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    if (maxWaitRef.current) {
      clearTimeout(maxWaitRef.current);
      maxWaitRef.current = undefined;
    }
    pendingRef.current = false;
  }, []);

  const flush = useCallback(() => {
    if (pendingRef.current) {
      const args = lastCallArgsRef.current;
      clear();
      fn(...args!);
    }
  }, [clear, fn]);

  const debouncedFn = useCallback(
    (...args: T) => {
      return new Promise<void>((resolve, reject) => {
        const currentTime = Date.now();
        const elapsed = currentTime - lastCallTimeRef.current;
        const delay = Math.max(0, ms - elapsed);

        clear();
        lastCallArgsRef.current = args;
        lastCallTimeRef.current = currentTime;

        if (pendingRef.current && delay > 0) {
          timerRef.current = setTimeout(() => {
            flush();
            resolve();
          }, delay);
        } else {
          pendingRef.current = true;
          timerRef.current = setTimeout(() => {
            lastInvokeRef.current = Date.now();
            flush();
            resolve();
          }, delay);
        }

        if (maxWait > 0) {
          maxWaitRef.current = setTimeout(() => {
            if (pendingRef.current) {
              if (rejectOnCancel) {
                reject();
              } else {
                resolve();
              }
              clear();
            }
          }, maxWait);
        }
      });
    },
    [clear, flush, maxWait, ms, rejectOnCancel]
  );

  return debouncedFn;
}

export default useDebounceFn;
