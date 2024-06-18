import { useEffect, useRef, useState } from 'react';

/**
 * Options object for the `useWatchAtMost` hook.
 *
 * This object provides configuration for the hook, including the maximum number
 * of times the callback should be triggered.
 *
 * @typedef {Object} WatchAtMostOptions
 * @property {number} count - The maximum number of times the callback should be triggered.
 */
interface WatchAtMostOptions {
  count: number;
}

/**
 * The return object structure of the `useWatchAtMost` hook.
 *
 * This object includes a method to stop triggering the callback and the count
 * of how many times the callback has been triggered.
 *
 * @typedef {Object} WatchAtMostReturn
 * @property {() => void} stop - A function to stop triggering the callback.
 * @property {number} count - The number of times the callback has been triggered.
 */
export interface WatchAtMostReturn {
  stop: () => void;
  count: number;
}

/**
 * Hook that triggers a callback function at most a specified number of times.
 *
 * This hook monitors a given source value and triggers a callback function whenever
 * the value changes. The callback will only be triggered up to a specified maximum count.
 *
 * @template T
 * @param {T} source - The value to monitor.
 * @param {(value: T) => void} callback - The function to call whenever the source value changes.
 * @param {WatchAtMostOptions} options - Additional options for the hook.
 * @param {number} options.count - The maximum number of times the callback can be triggered.
 * @returns {WatchAtMostReturn} An object containing a stop function and the trigger count.
 *
 * @example
 * // Example usage of useWatchAtMost
 * const { stop, count } = useWatchAtMost(someValue, (value) => {
 *   console.log(`Callback triggered with value: ${value}`);
 * }, { count: 3 });
 *
 * // Stop triggering the callback manually
 * stop();
 * console.log(`Callback triggered ${count} times`);
 */
export function useWatchAtMost<T>(
  source: T,
  callback: (value: T) => void,
  options: WatchAtMostOptions
): WatchAtMostReturn {
  const [triggerCount, setTriggerCount] = useState(0);
  const stopRef = useRef(false);
  const countRef = useRef(options.count);
  const prevSourceRef = useRef<T | undefined>(undefined);

  const stop = () => {
    stopRef.current = true;
  };

  useEffect(() => {
    if (stopRef.current || triggerCount >= countRef.current) return;

    const shouldTriggerCallback =
      prevSourceRef.current !== undefined && prevSourceRef.current !== source;

    if (shouldTriggerCallback) {
      callback(source);
      setTriggerCount(prev => prev + 1);
    }

    prevSourceRef.current = source;
  }, [source, callback, triggerCount]);

  return {
    stop,
    count: triggerCount,
  };
}

export const watchAtMost = useWatchAtMost;
