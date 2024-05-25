import { useMemo } from 'react'

interface UseToNumberOptions {
  /**
   * Specifies the method to convert the value: 'parseFloat' or 'parseInt'.
   * @type {'parseFloat' | 'parseInt'}
   * @default 'parseFloat'
   */
  method?: 'parseFloat' | 'parseInt'

  /**
   * The radix to use when `method` is 'parseInt'.
   * @type {number}
   * @default 10
   */
  radix?: number

  /**
   * If true, returns 0 instead of NaN when the conversion fails.
   * @type {boolean}
   * @default false
   */
  nanToZero?: boolean
}

/**
 * A custom hook to convert a string or number to a number using a specified method.
 *
 * @param {string | number} value - The value to convert to a number.
 * @param {UseToNumberOptions} [options={}] - Optional configuration for the conversion.
 * @param {'parseFloat' | 'parseInt'} [options.method='parseFloat'] - The method to convert the value.
 * @param {number} [options.radix=10] - The radix to use when `method` is 'parseInt'.
 * @param {boolean} [options.nanToZero=false] - If true, returns 0 instead of NaN when the conversion fails.
 * @returns {number} The converted number value.
 *
 * @example
 * Usage example:
 * const number = useToNumber('42', { method: 'parseInt', radix: 10 });
 * console.log(number); // Output: 42
 *
 * const floatNumber = useToNumber('3.14159', { method: 'parseFloat' });
 * console.log(floatNumber); // Output: 3.14159
 *
 * const invalidNumber = useToNumber('invalid', { nanToZero: true });
 * console.log(invalidNumber); // Output: 0
 */
export function useToNumber(
  value: string | number,
  options: UseToNumberOptions = {}
): number {
  const { method = 'parseFloat', radix = 10, nanToZero = false } = options

  const number = useMemo(() => {
    let parsed: number

    if (typeof value === 'number') {
      parsed = value
    } else if (typeof value === 'string') {
      parsed =
        method === 'parseFloat' ? parseFloat(value) : parseInt(value, radix)
    } else {
      parsed = NaN
    }

    return nanToZero && isNaN(parsed) ? 0 : parsed
  }, [value, method, radix, nanToZero])

  return number
}
