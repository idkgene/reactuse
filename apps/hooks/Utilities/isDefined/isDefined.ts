import { Defined } from '../utilities'

/**
 * @name isDefined
 * @description Checks if the given value is neither `null` nor `undefined`.
 * 
 * @returns {value is Exclude<T, null | undefined>} `true` if the value is defined, otherwise `false`.
 *
 * @example
 * const maybeValue: string | null | undefined = 'Hello';
 * if (isDefined(maybeValue)) {
 *   // maybeValue is now narrowed to `string`
 *   console.log(maybeValue);  // Output: 'Hello'
 * }
 *
 * const anotherValue: number | null = null;
 * const isAnotherDefined = isDefined(anotherValue); // Output: false
 */
export function isDefined<T>(value: T): value is Defined<T> {
  return value !== null && value !== undefined
}
