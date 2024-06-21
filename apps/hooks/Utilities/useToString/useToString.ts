import { useMemo } from 'react'
import { Resolvable } from '../utilities'

/**
 * A custom React hook that converts a value of any type to a string.
 *
 * @param value - The value to be converted to a string. It can be a direct value or a function.
 * @returns {string} The string representation of the value.
 *
 * @example
 * const myString = useToString(123); // myString will be "123";
 *
 * @example
 *
 * const myDynamicString = useToString(() => new Date().toLocaleString());
 * myDynamicString will be the current locale date and time as a string
 */
export function useToString<T>(value: Resolvable<T>): string {
  return useMemo(() => {
    const resolvedValue =
      typeof value === 'function' ? (value as () => T)() : value
    return String(resolvedValue)
  }, [value])
}
