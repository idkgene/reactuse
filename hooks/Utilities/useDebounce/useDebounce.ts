import { useState, useEffect } from 'react';

import type { DebounceOptions } from '../utilities';

/**
 * Returns a debounced version of a value that only updates after a specified wait time.
 *
 * @template T - The type of the value being debounced.
 * @param {T} value - The value to debounce.
 * @param {DebounceOptions} [options={}] - Options to customize the debounce behavior.
 * @param {number} [options.wait=0] - The wait time in milliseconds before updating the debounced value.
 * @param {boolean} [options.leading=false] - Whether to update the value immediately on leading edge.
 * @param {boolean} [options.trailing=true] - Whether to update the value at the trailing edge.
 * @param {number} [options.maxWait] - The maximum wait time in milliseconds before forcing the update.
 * @returns {T} The debounced value.
 *
 * @example
 * Debouncing a search query input
 * const debouncedQuery = useDebounce(searchQuery, { wait: 300 });
 * useEffect(() => {
 *   Trigger an API call or another async operation using debouncedQuery
 * }, [debouncedQuery]);
 */
export function useDebounce<T>(value: T, options: DebounceOptions = {}): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const clearTimer = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    if (options.wait !== undefined && options.wait > 0) {
      if (options.leading && !timeoutId) {
        setDebouncedValue(value);
      }

      clearTimer();
      timeoutId = setTimeout(() => {
        if (options.trailing !== false) {
          setDebouncedValue(value);
        }
        timeoutId = null;
      }, options.wait);
    } else {
      setDebouncedValue(value);
    }

    return () => clearTimer();
  }, [value, options.wait, options.leading, options.trailing]);

  return debouncedValue;
}
