import { useMemo } from 'react';

type ValueOrFunction<T> = T | (() => T);

function resolveValue<T>(value: ValueOrFunction<T>): T {
  return typeof value === 'function' ? (value as Function)() : value;
}

/**
 * Returns the maximum value from the given arguments or array of values.
 *
 * @param {...any[]} args - The values or arrays of values to compare.
 * @returns {number} The maximum value among the given arguments or array of values.
 *
 * @example
 * const maxValue = useMax(1, 2, 3);
 * // maxValue is 3
 *
 * @example
 * const maxValue = useMax([1, 2, 3]);
 * // maxValue is 3
 */
export function useMax(...args: any[]): number {
  return useMemo(() => {
    if (args.length === 1 && Array.isArray(resolveValue(args[0]))) {
      const array = resolveValue(args[0]) as ValueOrFunction<number>[];
      return Math.max(...array.map(resolveValue));
    } else {
      return Math.max(...args.map(resolveValue));
    }
  }, args);
}
