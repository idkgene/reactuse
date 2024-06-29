import { useState, useEffect } from 'react';
import type {
  PrecisionOptions,
  FormattedValue,
  UsePrecisionReturn,
} from '../math';

const formatNumber = (value: number, precision: number): FormattedValue => {
  return Number(value.toFixed(precision));
};

export function usePrecision({
  precision,
  value,
}: PrecisionOptions): UsePrecisionReturn {
  const [formattedValue, setFormattedValue] = useState<FormattedValue>(() =>
    formatNumber(value, precision),
  );

  useEffect(() => {
    setFormattedValue(formatNumber(value, precision));
  }, [precision, value]);

  return formattedValue;
}
