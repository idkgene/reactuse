import { useMemo } from 'react'

/**
 * A custom hook to convert a value or a function returning a value to a string.
 *
 * @template T - The type of the value to be converted to a string.
 * @param {T | (() => T)} value - The value or a function returning the value to convert to a string.
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
export function useToString<T>(value: T | (() => T)): string {
  return useMemo(() => {
    const resolvedValue =
      typeof value === 'function' ? (value as () => T)() : value
    return String(resolvedValue)
  }, [value])
}
