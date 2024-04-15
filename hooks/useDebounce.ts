
import { useEffect, useState } from "react";

/**
 * @module useDebounce
 * @template T - The type of the value to be debounced.
 * @param {T} value - The value to be debounced.
 * @param {number} [delay=500] - The debounce delay in milliseconds. Defaults to 500.
 * @returns {T} The debounced value.
 */

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}