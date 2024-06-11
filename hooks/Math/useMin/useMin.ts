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
 * React hook that returns the minimum value from the given arguments or an array of values.
 *
 * @param {...any[]} args - The values or arrays of values to compare.
 * @returns {number} The minimum value among the given arguments or array of values.
 *
 * @example
 * const minValue = useMin(1, 2, 3, 4, -1, 10); // Returns `-1`.
 * const minArrayValue = useMin([5, 10, 15, -5, 0]); // Returns `-5`.
 */
export function useMin(...args: any[]): number {
  return useMemo(() => {
    if (args.length === 1 && Array.isArray(resolveValue(args[0]))) {
      const array = resolveValue(args[0]) as Resolvable<number>[];
      return Math.min(...array.map(resolveValue));
    } else {
      return Math.min(...args.map(resolveValue));
    }
  }, args);
}
