/**
 * A type representing either a value directly or a function that returns a value.
 *
 * @template T The type of value or function's return type.
 */
export type Resolvable<T> = T | (() => T);

/**
 * Options for the `usePrecision` hook, specifying the precision level and value to format.
 * @property {number} precision - The number of decimal places to round the value to.
 * @property {number} value - The number to format.
 */
export type PrecisionOptions = {
  /**
   * The number of decimal places to round the value to.
   */
  precision: number;

  /**
   * The number to be formatted.
   */
  value: number;
};

/**
 * A formatted value represented as a number.
 */
export type FormattedValue = number;

/**
 * The return type of the `usePrecision` hook.
 */
export type UsePrecisionReturn = FormattedValue;

/**
 * A function that projects a value from one range to another.
 *
 * @template T The type of the input range values.
 * @template U The type of the output range values.
 * @param {T} value - The input value to project.
 * @param {T} fromMin - The minimum value of the input range.
 * @param {T} fromMax - The maximum value of the input range.
 * @param {U} toMin - The minimum value of the output range.
 * @param {U} toMax - The maximum value of the output range.
 * @returns {U} The projected value in the output range.
 */
export type ProjectorFunction<T, U> = (
  value: T,
  fromMin: T,
  fromMax: T,
  toMin: U,
  toMax: U
) => U;

/**
 * Function type for rounding a number.
 *
 * @typedef {Function} RoundNumberFn
 * @param {number} number - The number to be rounded.
 * @returns {void}
 */
export type RoundNumberFn = (number: number) => void;

/**
 * Function type for truncating a number
 *
 * @typedef {function} TruncateNumberFn
 * @param {number} number - The number to be truncated.
 * @returns {void}
 */
type TruncateNumberFn = (number: number) => void