import { useMemo } from 'react'
import { UseToNumberOptions } from '../utilities'

/**
 * @name useToNumber
 * @description A custom hook to convert a string or number to a number using a specified method.
 *
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
