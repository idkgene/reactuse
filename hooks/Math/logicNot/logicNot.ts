import { useMemo } from 'react';

type ValueOfFunction<T> = T | (() => T);

/**
 * Resolves a provided value or a function that returns a value.
 *
 * @template T
 * @param {ValueOrFunction<T>} value - A value or a function that returns a value.
 *
 * @returns {T} The resolved value.
 */
function resolveValue<T>(value: ValueOfFunction<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

/**
 * Uses a logical `NOT` operator with multiple values or functions.
 *
 * @param {ValueOfFunction<any>} v - The value or a function that returns a value.
 * @returns {boolean} The logical NOT of the provided value.
 *
 * @example
 * const result = logicNot(true); // Returns `false`.
 * const result = logicNot(() => true); // Returns `false`.
 */
export function logicNot(v: ValueOfFunction<any>): boolean {
  return useMemo(() => {
    return !resolveValue(v);
  }, [v]);
}

export { logicNot as not };
