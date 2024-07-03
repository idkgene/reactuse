import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Options for configuring the useInterval hook.
 * @param immediate - Whether to start the interval immediately.
 * @param callback - Optional callback function to be invoked on each interval tick.
 */
interface UseIntervalOptions {
  immediate?: boolean;
  callback?: (count: number) => void;
}

/**
 * The control functions and counter value returned by the useInterval hook.
 * @param counter - The current value of the interval counter.
 * @param reset - Function to reset the counter to 0.
 * @param pause - Function to pause the interval.
 * @param resume - Function to resume the interval.
 */
interface UseIntervalControls {
  counter: number;
  reset: () => void;
  pause: () => void;
  resume: () => void;
}

/**
 * Custom React hook that provides interval functionality with controls.
 *
 * @param interval - The interval duration in milliseconds. Must be a positive number.
 * @param options - Optional configuration options for the interval.
 * @returns  An object containin the current counter value and control functions.
 *
 * @example
 * ```tsx
 * const { counter, reset, pause, resume } = useInterval(1000, {
 *   immediate: true,
 *   callback: (count) => {
 *     console.log(`Interval count: ${count}`);
 *   },
 * });
 *
 * return (
 *   <div>
 *     <p>Counter: {counter}</p>
 *     <button onClick={reset}>Reset</button>
 *     <button onClick={pause}>Pause</button>
 *     <button onClick={resume}>Resume</button>
 *   </div>
 * );
 * ```
 *
 * @throws Error - If the provided interval is not a positive number.
 */
function useInterval(
  interval: number,
  options?: UseIntervalOptions,
): UseIntervalControls {
  if (typeof interval !== 'number' || interval <= 0) {
    throw new Error('useInterval: interval must be a positive number');
  }

  const { immediate = true, callback } = options ?? {};

  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(immediate);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const savedCallback = useRef<((count: number) => void) | undefined>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const reset = useCallback(() => {
    setCounter(0);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    setIsRunning(true);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCounter((prevCounter) => {
          const newCounter = prevCounter + 1;
          try {
            savedCallback.current?.(newCounter);
          } catch (error) {
            console.error('useInterval: Error in callback:', error);
          }
          return newCounter;
        });
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [interval, isRunning]);

  return { counter, reset, pause, resume };
}

export { useInterval };
export type { UseIntervalOptions, UseIntervalControls };