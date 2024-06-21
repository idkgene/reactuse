import { useMemo } from 'react';
import { UseToNumberOptions } from '../utilities';

/**
 * Converts a string or a number to a numeric value using specified options.
 *
 * @param {string | number} value - The value to be converted to a number.
 * @param {UseToNumberOptions} [options={}] - Conversion options.
 * @param {'parseFloat' | 'parseInt'} [options.method='parseFloat'] - Specifies the method to convert the value.
 * @param {number} [options.radix=10] - The radix to use when `method` is 'parseInt'.
 * @param {boolean} [options.nanToZero=false] - If true, returns 0 instead of NaN when the conversion fails.
 * @returns {number} The numeric representation of the input value.
 *
 * @example
 * Using parseFloat (default)
 * const num1 = useToNumber('42.42');
 * Using parseInt with radix 10
 * const num2 = useToNumber('42', { method: 'parseInt', radix: 10 });
 * Returning 0 instead of NaN
 * const num3 = useToNumber('invalid', { nanToZero: true });
 */
export function useToNumber(
  value: string | number,
  options: UseToNumberOptions = {}
): number {
  const { method = 'parseFloat', radix = 10, nanToZero = false } = options;

  const number = useMemo(() => {
    let parsed: number;

    if (typeof value === 'number') {
      parsed = value;
    } else if (typeof value === 'string') {
      parsed =
        method === 'parseFloat' ? parseFloat(value) : parseInt(value, radix);
    } else {
      parsed = NaN;
    }

    return nanToZero && isNaN(parsed) ? 0 : parsed;
  }, [value, method, radix, nanToZero]);

  return number;
}
