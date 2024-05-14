/**
 * Non-nullish checking type guard for Ref.
 *
 * @param v - The value to check.
 * @returns {boolean}
 */

export function isDefined<T>(value: T): value is Exclude<T, null | undefined> {
  return value !== null && value !== undefined
}
