import { useCallback } from 'react';

type NumericValue = number | bigint;
type NumericValueFactory<T extends NumericValue> = () => T;
type MaybeNumericValue<T extends NumericValue> = T | NumericValueFactory<T>;

interface UseCeilOptions {
  power?: number;
  precision?: number;
}

const LIMITS = {
  POWER: 308,
  PRECISION: 20,
} as const;

const BIGINT = {
  ZERO: 0n,
  ONE: 1n,
  TEN: 10n,
} as const;

function pow10(n: number): number {
  return 10 ** n;
}

function pow10BigInt(n: number): bigint {
  if (n < 0) {
    throw new RangeError('Negative exponents are not supported for BigInt.');
  }
  return BIGINT.TEN ** BigInt(n);
}

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

function validateNumber(value: number): number {
  if (!Number.isFinite(value)) {
    return NaN;
  }
  return value;
}

function applyPower(value: number, power: number): number {
  if (power === 0) return value;
  return value * pow10(power);
}

function applyPrecision(value: number, precision: number | undefined): number {
  if (precision == null) return value;
  
  const factor = pow10(precision);
  return Math.round(value * factor) / factor;
}

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

function validatePower(power: number): number {
  if (!Number.isInteger(power) || power < -LIMITS.POWER || power > LIMITS.POWER) {
    throw new Error(`Power must be an integer between -${LIMITS.POWER} and ${LIMITS.POWER}`);
  }
  return power;
}

function validatePrecision(precision: number | undefined): number | undefined {
  if (precision === undefined) return undefined;
  
  const value = Number(precision);
  if (!Number.isInteger(value) || value < 0 || value > LIMITS.PRECISION) {
    throw new Error(`Precision must be an integer between 0 and ${LIMITS.PRECISION}`);
  }
  return value;
}

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
        : input;

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
