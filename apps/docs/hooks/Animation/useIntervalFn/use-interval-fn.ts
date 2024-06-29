import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * A type that represents a function that does not return a value.
 */
export type Fn = () => void;

/**
 * A type that represents a function that returns a value.
 * @param T - The type of the value returned by the function.
 */
export type Resolvable<T> = T | (() => T);

/**
 * The control functions and counter value returned by the useIntervalFn hook.
 * @param isActive - Indicates whether the interval is currently active.
 * @param pause - Function to pause the interval.
 * @param resume - Function to resume the interval.
 */
export interface Pausable {
  isActive: boolean;
  pause: () => void;
  resume: () => void;
}

/**
 * Options for configuring the useIntervalFn hook.
 * @param immediate - Whether to start the interval immediately.
 * @param immediateCallback - Whether to execute the callback immediately after calling `resume`.
 */
export interface UseIntervalFnOptions {
  immediate?: boolean;
  immediateCallback?: boolean;
}

/**
 * A custom React hook to create a pausable interval function.
 *
 * @param callback - The callback function to be invoked at each interval.
 * @param interval - The interval duration in milliseconds. Can be a constant or a function.
 * @param options - Optional configuration options for the interval.
 * @returns  An object containin the current counter value and control functions.
 *
 * @example
 * ```tsx
 * const { isActive, pause, resume } = useIntervalFn(() => console.log('Tick'), 1000, { immediateCallback: true });
 * ```
 */
export function useIntervalFn(
  callback: Fn,
  interval: Resolvable<number> = 1000,
  options?: UseIntervalFnOptions,
): Pausable {
  if (typeof callback !== 'function') {
    throw new Error('useIntervalFn: callback must be a function');
  }

  const { immediate = true, immediateCallback = false } = options ?? {};

  const [isActive, setIsActive] = useState(immediate);
  const savedCallback = useRef<Fn>(callback);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (isActive) {
      if (immediateCallback) {
        try {
          savedCallback.current();
        } catch (error) {
          console.error('useIntervalFn: Error in immediate callback:', error);
        }
      }

      const intervalValue =
        typeof interval === 'function' ? interval() : interval;

      if (typeof intervalValue !== 'number' || intervalValue <= 0) {
        throw new Error(
          'useIntervalFn: interval must resolve to a positive number',
        );
      }

      intervalRef.current = setInterval(() => {
        try {
          savedCallback.current();
        } catch (error) {
          console.error('useIntervalFn: Error in callback:', error);
        }
      }, intervalValue);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, interval, immediateCallback]);

  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  const resume = useCallback(() => {
    setIsActive(true);
    if (immediateCallback) {
      try {
        savedCallback.current();
      } catch (error) {
        console.error('useIntervalFn: Error in immediate callback:', error);
      }
    }
  }, [immediateCallback]);

  return { isActive, pause, resume };
}
