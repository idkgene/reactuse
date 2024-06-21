import { useEffect, useRef, useState } from 'react';

import type { WatchCallback, WheneverOptions } from '../watch';

/**
 * React utility that watches a value and triggers a callback whenever the value is truthy.
 *
 * @template T
 * @param {T | false | null | undefined} value - The value to monitor. The callback
 * will only be triggered if this value is truthy.
 * @param {WatchCallback<T>} callback - The function to call whenever the value is truthy.
 * Receives the current value and the previous value as arguments.
 * @param {WheneverOptions} [options] - Additional options for the hook.
 * @param {boolean} [options.once=false] - If true, the callback will be triggered only once.
 * @returns {void}
 *
 * @example
 * // Example usage of useWhenever
 * useWhenever(someTruthyValue, (current, previous) => {
 *   console.log(`Value changed from ${previous} to ${current}`);
 * }, { once: true });
 */
export function useWhenever<T>(
  value: T | false | null | undefined,
  callback: WatchCallback<T>,
  options?: WheneverOptions
): void {
  const { once = false } = options || {};
  const [previous, setPrevious] = useState<T | undefined>(undefined);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (value) {
      if (!once || !hasTriggeredRef.current) {
        callback(value, previous);
        hasTriggeredRef.current = true;
      }
      setPrevious(value);
    }
  }, [value, callback, previous, once]);
}

export const whenever = useWhenever