/**
 * A React hook that debounces the value passed to it.
 *
 * @module useDebounce
 * @template T - The type of the value to be debounced.
 * @param {T} value - The value to be debounced.
 * @param {number} [delay=500] - The debounce delay in milliseconds. Defaults to 500.
 * @returns {T} The debounced value.
 */

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  // Use the useState hook to manage the state of the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Create a timer using setTimeout to delay the update of the debounced value
    const timer = setTimeout(() => {
      // Update the debounced value state with the latest value
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer when the component unmounts or the dependencies change
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  // Return the debounced value
  return debouncedValue;
}