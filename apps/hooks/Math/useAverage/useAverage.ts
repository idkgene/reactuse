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
 * Custom React hook that calculates the average of the provided values.
 *
 * @param {...any[]} args - The values (or an array of values) to calculate the average of.
 * @returns {number} The average of the resolved values.
 *
 * @example
 * const avg = useAverage(1, 2, 3, 4); // Returns `2.5`.
 * const avgArray = useAverage([1, 2, 3, 4]); // Returns `2.5`.
 */
export function useAverage(...args: any[]): number {
  const values = useMemo(() => {
    return Array.isArray(args[0]) ? args[0] : args;
  }, [JSON.stringify(args)]);

  return useMemo(() => {
    const resolvedValues = values.map(resolveValue);
    const sum = resolvedValues.reduce((acc, val) => acc + val, 0);
    return sum / resolvedValues.length;
  }, [JSON.stringify(values)]);
}
