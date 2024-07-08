import { useMemo } from 'react';

export type Precision = number;
export type NumericValue = number;

export interface PrecisionOptions {
  precision: Precision;
  value: NumericValue;
}

export type FormattedValue = number;

const isValidPrecision = (precision: Precision): boolean =>
  Number.isInteger(precision) && precision >= 0;

const isValidNumericValue = (value: NumericValue): boolean =>
  !Number.isNaN(value) && Number.isFinite(value);

const formatNumber = (
  value: NumericValue,
  precision: Precision,
): FormattedValue => {
  if (!isValidPrecision(precision)) {
    throw new Error(
      `Invalid precision: ${String(precision)}. Precision must be a non-negative integer.`,
    );
  }
  if (!isValidNumericValue(value)) {
    throw new Error(
      `Invalid value: ${String(value)}. Value must be a valid number.`,
    );
  }
  return Number(value.toFixed(precision));
};

export function usePrecision({
  precision,
  value,
}: PrecisionOptions): FormattedValue {
  return useMemo(() => {
    try {
      return formatNumber(value, precision);
    } catch (error) {
      console.error(error);
      return NaN;
    }
  }, [precision, value]);
}
