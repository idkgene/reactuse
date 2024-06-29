import { useMemo } from 'react';
import { type UseToNumberOptions } from '../utilities';

export function useToNumber(
  value: string | number,
  options: UseToNumberOptions = {},
): number {
  const { method = 'parseFloat', radix = 10, nanToZero = false } = options;

  return useMemo(() => {
    if (method === 'parseInt' && (radix < 2 || radix > 36)) {
      throw new Error('Invalid radix. Must be between 2 and 36.');
    }

    let parsed: number;

    if (typeof value === 'number') {
      if (!Number.isFinite(value)) {
        throw new Error('Input number must be finite.');
      }
      parsed = value;
    } else if (typeof value === 'string') {
      if (value.trim() === '') {
        throw new Error('Input string cannot be empty or only whitespace.');
      }
      parsed =
        method === 'parseFloat' ? parseFloat(value) : parseInt(value, radix);
    } else {
      throw new Error('Input must be a number or a string.');
    }

    if (isNaN(parsed) && !nanToZero) {
      throw new Error('Parsing resulted in NaN and nanToZero is false.');
    }

    return nanToZero && isNaN(parsed) ? 0 : parsed;
  }, [value, method, radix, nanToZero]);
}
