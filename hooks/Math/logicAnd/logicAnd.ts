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
 * Uses a logical `AND` operator with multiple values or functions.
 *
 * @param {...Resolvable<any>} args - The values or functions to evaluate.
 * @returns {boolean} Returns `true` if all evaluated values are true; otherwise, `false`.
 *
 * @example
 * const result = and(true, () => true, false); // Returns `false`.
 */
export function logicAnd(...args: Resolvable<any>[]): boolean {
  return args.every(arg => resolveValue(arg));
}

export { logicAnd as and };
