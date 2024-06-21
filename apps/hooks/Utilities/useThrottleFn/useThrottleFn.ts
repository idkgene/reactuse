import { useRef, useCallback } from 'react';
import { FunctionArgs, PromiseType, CallbackType } from '../utilities';

/**
 * Returns a throttled version of a function that will only execute at most once every specified number of ms.
 *
 * @template T - The argument types of the function.
 * @param {CallbackType<T>} fn - The function to be throttled.
 * @param {number} [ms=200] - The throttle interval in milliseconds.
 * @param {boolean} [trailing=true] - Whether to call the function at the end of the throttle interval.
 * @param {boolean} [leading=true] - Whether to call the function at the start of the throttle interval.
 * @param {boolean} [rejectOnCancel=false] - Whether to reject the promise when the function execution is cancelled.
 * @returns {PromiseType<T>} The throttled function that returns a promise.
 *
 * @example
 * Throttled function with default options
 * const throttledLog = useThrottleFn((message: string) => console.log(message));
 * throttledLog('Hello, world!');
 */
export function useThrottleFn<T extends FunctionArgs>(
  fn: CallbackType<T>,
  ms = 200,
  trailing = true,
  leading = true,
  rejectOnCancel = false
): PromiseType<T> {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const lastCallTimeRef = useRef<number>(0);
  const lastCallArgsRef = useRef<T>();
  const pendingRef = useRef(false);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const flush = useCallback(() => {
    if (pendingRef.current) {
      fn(...lastCallArgsRef.current!);
      lastCallArgsRef.current = undefined;
      lastCallTimeRef.current = Date.now();
      pendingRef.current = false;
    }
  }, [fn]);

  const throttledFn = useCallback(
    (...args: T) => {
      return new Promise<void>((resolve, reject) => {
        const elapsed = Date.now() - lastCallTimeRef.current;
        const shouldCall = elapsed > ms;

        clear();

        if (shouldCall) {
          if (leading) {
            fn(...args);
            lastCallTimeRef.current = Date.now();
          } else {
            pendingRef.current = true;
            lastCallArgsRef.current = args;
          }

          resolve();
        } else {
          if (trailing) {
            pendingRef.current = true;
            lastCallArgsRef.current = args;

            timerRef.current = setTimeout(() => {
              flush();
              resolve();
            }, ms - elapsed);
          } else {
            if (rejectOnCancel) {
              reject();
            } else {
              resolve();
            }
          }
        }
      });
    },
    [clear, flush, fn, leading, ms, rejectOnCancel, trailing]
  );

  return throttledFn;
}
