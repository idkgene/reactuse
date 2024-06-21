import { useMemo } from 'react';
import type { Resolvable } from '../math';

/**
 * Resolves a provided value or a function that returns a value.
 *
 * @template T
 * @param {Resolvable<T>} value - A value or a function that returns a value.
 * @returns {T} The resolved value.
 */
function resolveValue<T>(value: Resolvable<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

/**
 * Uses a logical `OR` operator with multiple values or functions.
 * 
 * @param args  - The values or functions to evaluate.
 * @returns {boolean} Returns `true` if any of the evaluated values are true; otherwise, `false`.
 */
export function logicOr(...args: Resolvable<any>[]): boolean {
  return useMemo(() => {
    return args.some(arg => resolveValue(arg));
  }, args);
}

export { logicOr as or };
