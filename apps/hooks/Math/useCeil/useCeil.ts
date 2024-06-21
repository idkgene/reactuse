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
 * Custom React hook that returns the smallest integer greater than or equal to the given number.
 *
 * @param {Resolvable<number>} value - A number or a function that returns a number.
 * @returns {number} The smallest integer greater than or equal to the provided number.
 *
 * @example
 * const ceilValue = useCeil(4.2); // Returns `5`.
 * const ceilValueFromFn = useCeil(() => 4.7); // Returns `5`.
 */
export function useCeil(value: Resolvable<number>): number {
  const result = useMemo(() => {
    const resolvedValue = resolveValue(value);
    return Math.ceil(resolvedValue);
  }, [value]);

  return result;
}
