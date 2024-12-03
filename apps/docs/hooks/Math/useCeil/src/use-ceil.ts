import { useCallback } from "react";

type NumericValue = number | bigint;
type NumericValueFactory<T extends NumericValue> = () => T;
type MaybeNumericValue<T extends NumericValue> = T | NumericValueFactory<T>;

/**
 * Configuration options for the ceiling operation
 */
interface UseCeilOptions {
  /**
   * Power of 10 to adjust decimal position
   * @example
   * power: 2  // Shifts decimal 2 places right (1.234 → 123.4)
   * power: -1 // Shifts decimal 1 place left (123.4 → 12.34)
   */
  power?: number;

  /**
   * Number of decimal places in the result
   * @example
   * precision: 2 // Rounds to 2 decimal places (1.2345 → 1.24)
   */
  precision?: number;
}

/**
 * Mathematical limits for power and precision operations
 * - POWER: Maximum safe power of 10 in JavaScript (Number.MAX_SAFE_INTEGER)
 * - PRECISION: Maximum meaningful decimal places before floating-point errors
 */
const LIMITS = {
  POWER: 308,      // Math.floor(Math.log10(Number.MAX_VALUE))
  PRECISION: 20,   // Practical limit before floating-point precision issues
} as const;

/**
 * Common BigInt constants to avoid repeated creation
 * Using constants improves performance and readability
 */
const BIGINT = {
  ZERO: 0n,
  ONE: 1n,
  TEN: 10n,
} as const;

/**
 * Calculates 10 raised to the given power for regular numbers
 */
function pow10(n: number): number {
  return 10 ** n;
}

/**
 * Calculates 10 raised to the given power for BigInt values
 * @throws {RangeError} When attempting to use negative exponents with BigInt
 */
function pow10BigInt(n: number): bigint {
  if (n < 0) {
    throw new RangeError('Negative exponents are not supported for BigInt.');
  }
  return BIGINT.TEN ** BigInt(n);
}

/**
 * Handles ceiling operation for BigInt values with power adjustment
 *
 * Process:
 * 1. Validate power constraints for BigInt
 * 2. Calculate divisor based on power
 * 3. Handle negative values separately
 * 4. Perform ceiling operation using division and remainder
 *
 * @throws {RangeError} When using negative power with BigInt values
 */
function handleBigInt(
  value: bigint,
  power?: number,
): bigint {
  if (power !== undefined && power < 0) {
    throw new RangeError('Negative power is not supported for BigInt values.');
  }
  const divisor = power ? pow10BigInt(power) : BIGINT.ONE;
  const isNegative = value < BIGINT.ZERO;
  const abs = isNegative ? -value : value;
  const quotient = abs / divisor;
  const remainder = abs % divisor;
  let result = remainder === BIGINT.ZERO ? quotient : quotient + BIGINT.ONE;
  return isNegative ? -result : result;
}

/**
 * Validates numeric input, returning NaN for invalid values
 */
function validateNumber(value: number): number {
  if (!Number.isFinite(value)) {
    return NaN;
  }
  return value;
}

/**
 * Applies power transformation to a number
 * Handles the decimal point shifting part of the ceiling operation
 */
function applyPower(value: number, power: number): number {
  if (power === 0) return value;
  return value * pow10(power);
}

/**
 * Applies precision rounding to a number
 * Ensures consistent decimal places in the result
 */
function applyPrecision(value: number, precision: number | undefined): number {
  if (precision == null) return value;

  const factor = pow10(precision);
  return Math.round(value * factor) / factor;
}

/**
 * Validates power input against defined limits
 * @throws {Error} When power is invalid or out of bounds
 */
function validatePower(power: number): number {
  if (!Number.isInteger(power) || power < -LIMITS.POWER || power > LIMITS.POWER) {
    throw new Error(`Power must be an integer between -${LIMITS.POWER} and ${LIMITS.POWER}`);
  }
  return power;
}

/**
 * Validates precision input against defined limits
 * @throws {Error} When precision is invalid or out of bounds
 */
function validatePrecision(precision: number | undefined): number | undefined {
  if (precision === undefined) return undefined;

  const value = Number(precision);
  if (!Number.isInteger(value) || value < 0 || value > LIMITS.PRECISION) {
    throw new Error(`Precision must be an integer between 0 and ${LIMITS.PRECISION}`);
  }
  return value;
}

/**
 * Handles ceiling operation for number values with power and precision adjustments
 *
 * Process:
 * 1. Validate input number
 * 2. Apply power transformation
 * 3. Perform ceiling operation
 * 4. Apply precision rounding
 *
 * @throws {Error} When power or precision is invalid
 */
function handleNumber(
  value: number,
  power: number,
  precision: number | undefined,
): number {
  const validatedValue = validateNumber(value);
  if (!Number.isFinite(validatedValue)) return validatedValue;

  const withPower = applyPower(validatedValue, power);
  const withPrecision = applyPrecision(withPower, precision);

  return Math.ceil(withPrecision);
}

/**
 * A React hook that provides ceiling functionality for numeric values with optional power and precision controls.
 *
 * This hook handles both regular numbers and BigInts, allowing for precise ceiling operations with:
 * - Power adjustment: Shifts the decimal point before ceiling (e.g., power of 2 turns 1.234 into 123.4)
 * - Precision control: Rounds the result to a specified number of decimal places
 *
 * @example
 * ```tsx
 * // Basic usage
 * const [value, setValue] = useCeil(1.234);
 * console.log(value); // 2
 *
 * // With power (shift decimal point)
 * const [value, setValue] = useCeil(1.234, { power: 2 });
 * console.log(value); // 1.24
 *
 * // With precision (round to decimal places)
 * const [value, setValue] = useCeil(1.234, { precision: 2 });
 * console.log(value); // 1.24
 *
 * // With BigInt
 * const [value, setValue] = useCeil(123n);
 * console.log(value); // 123n
 *
 * // With factory function
 * const [value, setValue] = useCeil(() => expensive_computation());
 * ```
 *
 * @template T - The numeric type (number | bigint) that this hook instance will work with
 * @param value - Initial numeric value or a factory function that returns a numeric value
 * @param options - Configuration options for ceiling operation
 * @param options.power - Power of 10 to adjust decimal position (-308 to 308)
 * @param options.precision - Number of decimal places in the result (0 to 20)
 *
 * @returns A tuple containing:
 * - Current ceiling value of type T
 * - Setter function that accepts either a new value or a factory function
 *
 * @throws {Error} When power is not an integer between -308 and 308
 * @throws {Error} When precision is not an integer between 0 and 20
 * @throws {RangeError} When using negative power with BigInt values
 */
function useCeil<T extends NumericValue>(
  value: MaybeNumericValue<T>,
  options: UseCeilOptions = {},
): [T, (newValue: MaybeNumericValue<T>) => T] {
  const {
    power: rawPower = 0,
    precision,
  } = options;

  const power = validatePower(Number(rawPower));
  const normalizedPrecision = validatePrecision(precision);

  const handleValue = useCallback(
    (input: MaybeNumericValue<T>): T => {
      const rawValue = typeof input === 'function'
        ? (input as NumericValueFactory<T>)()
        : (input as T);

      if (typeof rawValue === 'bigint') {
        return handleBigInt(rawValue, power) as T;
      }

      return handleNumber(
        rawValue as number,
        power,
        normalizedPrecision,
      ) as T;
    },
    [power, normalizedPrecision],
  );

  const currentValue = handleValue(value);
  const setValue = useCallback((newValue: MaybeNumericValue<T>) => {
    return handleValue(newValue);
  }, [handleValue]);

  return [currentValue, setValue];
}

export type {
  NumericValue,
  NumericValueFactory,
  MaybeNumericValue,
  UseCeilOptions,
};

export default useCeil;
