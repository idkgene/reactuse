import * as React from 'react';

import type {
  PrecisionOptions,
  FormattedValue,
  UsePrecisionReturn,
} from '../math';

/**
 * Formats a number to a specified precision.
 *
 * @param {number} value - The number to format.
 * @param {number} precision - The number of decimal places to round the value to.
 * @returns {FormattedValue} The formatted value.
 */
const formatNumber = (value: number, precision: number): FormattedValue => {
  return Number(value.toFixed(precision));
};

/**
 * A hook that formats a number to a specified precision.
 *
 * This hook takes a `precision` and a `value` as parameters and returns a formatted value.
 * The formatted value is a number rounded to the specified precision.
 *
 * @param {PrecisionOptions} options - An object containing the precision and value to format.
 * @param {number} options.precision - The number of decimal places to round the value to.
 * @param {number} options.value - The number to format.
 * @returns {UsePrecisionReturn} The formatted value.
 *
 * @example
 * const formattedValue = usePrecision({ precision: 2, value: 3.14159 });
 */
export function usePrecision({
  precision,
  value,
}: PrecisionOptions): UsePrecisionReturn {
  const [formattedValue, setFormattedValue] = useState<FormattedValue>(() =>
    formatNumber(value, precision)
  );

  useEffect(() => {
    setFormattedValue(formatNumber(value, precision));
  }, [precision, value]);

  return formattedValue;
}
