type ValueOrFunction<T> = T | (() => T);

/**
 * Resolves a provided value or a function that returns a value.
 *
 * @template T
 * @param {ValueOrFunction<T>} value - A value or a function that returns a value.
 * @returns {T} The resolved value.
 */
function resolveValue<T>(value: ValueOrFunction<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

/**
 * Uses a logical `AND` operator with multiple values or functions.
 *
 * @param {...ValueOrFunction<any>} args - The values or functions to evaluate.
 * @returns {boolean} Returns `true` if all evaluated values are true; otherwise, `false`.
 *
 * @example
 * const result = and(true, () => true, false); // Returns `false`.
 */
export function logicAnd(...args: ValueOrFunction<any>[]): boolean {
  return args.every(arg => resolveValue(arg));
}

export { logicAnd as and };
