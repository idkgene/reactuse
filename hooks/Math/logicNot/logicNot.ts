import { useMemo } from 'react';
import type { Resolvable } from '../math';

/**
 * Resolves a provided value or a function that returns a value.
 *
 * @template T
 * @param {Resolvable<T>} value - A value or a function that returns a value.
 *
 * @returns {T} The resolved value.
 */
function resolveValue<T>(value: Resolvable<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

/**
 * Uses a logical `NOT` operator with multiple values or functions.
 *
 * @param {Resolvable<any>} v - The value or a function that returns a value.
 * @returns {boolean} The logical NOT of the provided value.
 *
 * @example
 * const result = logicNot(true); // Returns `false`.
 * const result = logicNot(() => true); // Returns `false`.
 */
export function logicNot(v: Resolvable<any>): boolean {
  return useMemo(() => {
    const resolvedValue = resolveValue(v);
    return !resolvedValue;
  }, [v]);
}

export { logicNot as not };
