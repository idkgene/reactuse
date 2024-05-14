import { useMemo } from 'react'

/**
 * Reactively convert a value or a getter function to a string.
 *
 * @param value - The value or getter function to convert to a string.
 * @returns A memoized string representation of the value.
 */
export function useToString<T>(value: T | (() => T)): string {
  return useMemo(() => {
    const resolvedValue =
      typeof value === 'function' ? (value as () => T)() : value
    return String(resolvedValue)
  }, [value])
}
