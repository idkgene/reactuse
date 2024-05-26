import { useMemo } from 'react'
import { Resolvable } from '../utilities'

/**
 * @name useToString
 * @description A custom hook to convert a value or a function returning a value to a string.
 *
 * @returns {string} The string representation of the resolved value.
 *
 * @example
 * Usage example:
 * const stringValue = useToString(42);
 * console.log(stringValue); // Output: '42'
 *
 * const dynamicStringValue = useToString(() => new Date().getFullYear());
 * console.log(dynamicStringValue); // Output: '2024' (or the current year)
 */
export function useToString<T>(value: Resolvable<T>): string {
  return useMemo(() => {
    const resolvedValue =
      typeof value === 'function' ? (value as () => T)() : value
    return String(resolvedValue)
  }, [value])
}
