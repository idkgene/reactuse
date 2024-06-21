import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Type for a function without parameters and return type.
 *
 * @typedef {() => void} Fn
 */
export type Fn = () => void;

/**
 * Type for a value that can be a constant or a function that returns the value.
 *
 * @template T - The type of the value.
 * @typedef {T | (() => T)} Resolvable
 */
export type Resolvable<T> = T | (() => T);

/**
 * Interface for a function that can be paused and resumed.
 *
 * @interface Pausable
 * @property {boolean} isActive - Indicates whether the function is currently active.
 * @property {() => void} pause - Pauses the function.
 * @property {() => void} resume - Resumes the function.
 */
export interface Pausable {
  isActive: boolean;
  pause: () => void;
  resume: () => void;
}

/**
 * Options for the useIntervalFn hook.
 *
 * @interface UseIntervalFnOptions
 * @property {boolean} [immediate=true] - Start the timer immediately.
 * @property {boolean} [immediateCallback=false] - Execute the callback immediately after calling `resume`.
 */
export interface UseIntervalFnOptions {
  immediate?: boolean;
  immediateCallback?: boolean;
}

/**
 * Wrapper for `setInterval` with controls.
 *
 * @param {Fn} callback - The callback function to be invoked at each interval.
 * @param {Resolvable<number>} [interval=1000] - The interval in milliseconds.
 * @param {UseIntervalFnOptions} [options] - Options for the useIntervalFn hook.
 * @returns {Pausable} An object with `isActive` state and `pause` and `resume` functions to control the interval.
 *
 * @example
 * const { isActive, pause, resume } = useIntervalFn(() => {
 *   // Your callback
 * });
 */
export function useIntervalFn(
  callback: Fn,
  interval: Resolvable<number> = 1000,
  options?: UseIntervalFnOptions
): Pausable {
  const { immediate = true, immediateCallback = false } = options || {};

  const [isActive, setIsActive] = useState(immediate);
  const savedCallback = useRef<Fn>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (isActive) {
      const intervalValue =
        typeof interval === 'function' ? interval() : interval;

      intervalRef.current = setInterval(() => {
        savedCallback.current?.();
      }, intervalValue);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, interval]);

  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  const resume = useCallback(() => {
    setIsActive(true);
    if (immediateCallback) {
      savedCallback.current?.();
    }
  }, [immediateCallback]);

  return { isActive, pause, resume };
}
