import { useMemo } from 'react';
import type { Resolvable } from '../math';

/**
 * Resolves a value, whether it's a plain value or a function that returns a value.
 *
 * @template T The type of the resolved value.
 * @param {Resolvable<T>} value - A value or a function that returns a value.
 * @returns {T} The resolved value.
 */
function resolveValue<T>(value: Resolvable<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

/**
 * React hook that returns the largest integer less than or equal to the given number (Math.floor).
 *
 * @param {Resolvable<number>} value - The value to be floored.
 * @returns {number} The floored value.
 *
 * @example
 * const floored = useFloor(4.9); // Returns `4`.
 * const flooredWithFn = useFloor(() => 7.8); // Returns `7`.
 */
export function useFloor(value: Resolvable<number>): number {
  const flooredValue = useMemo(() => {
    const resolvedValue = resolveValue(value);
    return Math.floor(resolvedValue);
  }, [value]);

  return flooredValue;
}