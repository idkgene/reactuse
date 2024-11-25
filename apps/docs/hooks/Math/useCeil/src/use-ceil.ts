import { useCallback } from 'react';

type NumberValue = number | bigint;
type NumberFactory<T extends NumberValue> = () => T;
type MaybeFactory<T extends NumberValue> = T | NumberFactory<T>;

interface Options<T extends NumberValue> {
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

const pow10 = (n: number) => Math.pow(10, n);

const pow10BigInt = (n: number): bigint => {
  if (n < 0) {
    throw new RangeError('Negative exponents are not supported for BigInt.');
  }
  return BIGINT.TEN ** BigInt(n);
};

const handleBigInt = (
  value: bigint,
  power?: number,
): bigint => {
  if (power !== undefined && power < 0) {
    throw new RangeError('Negative power is not supported for BigInt values.');
  }
  const divisor = power ? pow10BigInt(power) : BIGINT.ONE;
  if (divisor === BIGINT.ZERO) return value;

  const isNegative = value < BIGINT.ZERO;
  const abs = isNegative ? -value : value;
  const quotient = abs / divisor;
  const remainder = abs % divisor;
  let result = remainder === BIGINT.ZERO ? quotient : quotient + BIGINT.ONE;
  return isNegative ? -result : result;
};

const handleNumber = (
  value: number,
  power: number,
  precision: number | undefined,
): number => {
  if (!Number.isFinite(value)) {
    return NaN;
  }

  if (power && (power < -LIMITS.POWER || power > LIMITS.POWER || !Number.isInteger(power))) {
    return NaN;
  }

  if (precision !== undefined &&
      (precision < 0 || precision > LIMITS.PRECISION || !Number.isInteger(precision))) {
    return NaN;
  }

  let result = value;

  if (power) {
    const scale = pow10(power);
    if (!Number.isFinite(scale)) {
      return NaN;
    }
    result = Math.ceil(result * scale) / scale;
  } else {
    result = Math.ceil(result);
  }

  if (precision !== undefined) {
    const scale = pow10(precision);
    if (!Number.isFinite(scale)) {
      return NaN;
    }
    result = Math.round(result * scale) / scale;
  }

  return result;
};

function useCeil<T extends NumberValue>(
  value: MaybeFactory<T>,
  options: Options<T> = {},
): [T, (newValue: MaybeFactory<T>) => T] {
  const {
    power: rawPower = 0,
    precision,
  } = options;

  const power = Number.isFinite(Number(rawPower)) ? Number(rawPower) : 0;
  const normalizedPrecision = precision != null ? Number(precision) : undefined;

  const handleValue = useCallback(
    (input: MaybeFactory<T>): T => {
      const rawValue = typeof input === 'function'
        ? (input as NumberFactory<T>)()
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
  const setValue = useCallback((newValue: MaybeFactory<T>) => {
    return handleValue(newValue);
  }, [handleValue]);

  return [currentValue, setValue];
}

export type {
  NumberValue,
  NumberFactory,
  MaybeFactory,
  Options,
};

export default useCeil;
