/**
 * Checks if the given value is neither `null` nor `undefined`.
 *
 * @template T - The type of the value being checked.
 * @param {T} value - The value to check.
 * @returns {value is Exclude<T, null | undefined>} `true` if the value is defined, otherwise `false`.
 *
 * @example
 * // Usage example:
 * const maybeValue: string | null | undefined = 'Hello';
 * if (isDefined(maybeValue)) {
 *   // maybeValue is now narrowed to `string`
 *   console.log(maybeValue);  // Output: 'Hello'
 * }
 *
 * const anotherValue: number | null = null;
 * const isAnotherDefined = isDefined(anotherValue); // Output: false
 */
export function isDefined<T>(value: T): value is Exclude<T, null | undefined> {
  return value !== null && value !== undefined
}
