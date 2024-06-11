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
 * React hook that returns the maximum value from the given arguments or an array of values.
 *
 * @param {...any[]} args - The values or arrays of values to compare.
 * @returns {number} The maximum value among the given arguments or array of values.
 *
 * @example
 * const maxValue = useMax(1, 2, 3); // Returns `3`.
 * const maxValueFromArray = useMax([1, 2, 3]); // Returns `3`.
 */
export function useMax(...args: any[]): number {
  return useMemo(() => {
    if (args.length === 1 && Array.isArray(resolveValue(args[0]))) {
      const array = resolveValue(args[0]) as Resolvable<number>[];
      return Math.max(...array.map(resolveValue));
    } else {
      return Math.max(...args.map(resolveValue));
    }
  }, args);
}
