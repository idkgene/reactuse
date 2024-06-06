import { useMemo } from 'react';

type ValueOrFunction<T> = T | (() => T);

function resolveValue<T>(value: ValueOrFunction<T>): T {
  return typeof value === 'function' ? (value as Function)() : value;
}

/**
 * Returns the minimum value from the given arguments.
 *
 * The `useMin` hook accepts any number of arguments, which can be either
 * individual values or arrays of values. If an array is provided, the hook
 * will return the minimum value from the array. If individual values are
 * provided, the hook will return the minimum value from those values.
 *
 * @param {...(number | (() => number) | number[])} args - The values or arrays of values from which to find the minimum.
 * @returns {number} The minimum value from the given arguments.
 *
 * @example
 * const minValue = useMin(1, 2, 3, 4, -1, 10); // Returns -1
 * const minArrayValue = useMin([5, 10, 15, -5, 0]); // Returns -5
 */
export function useMin(...args: any[]): number {
  return useMemo(() => {
    if (args.length === 1 && Array.isArray(resolveValue(args[0]))) {
      const array = resolveValue(args[0]) as ValueOrFunction<number>[];
      return Math.min(...array.map(resolveValue));
    } else {
      return Math.min(...args.map(resolveValue));
    }
  }, args);
}
