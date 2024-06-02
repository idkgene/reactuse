import { useEffect, useState } from 'react'

type MaybeRefOrGetter<T> = T | (() => T)

/**
 * Returns the absolute value of a number.
 *
 * @param {MaybeRefOrGetter<number>} value - The number to get the absolute value of.
 * @returns {number} The absolute value of the number.
 *
 * @example
 * const absValue = useAbs(-5);
 * console.log(absValue) // Output: 5;
 */
export const useAbs = (value: MaybeRefOrGetter<number>): number => {
  const getValue = (value: MaybeRefOrGetter<number>): number => {
    if (typeof value === 'function') {
      return value()
    }
    if (typeof value === 'number') {
      return value
    }
    throw new Error(
      'useAbs: value must be a number or a function that returns a number.'
    )
  }

  const getAbsValue = (value: MaybeRefOrGetter<number>): number => {
    try {
      return Math.abs(getValue(value))
    } catch (error) {
      console.error('useAbs error:', error)
      return 0
    }
  }

  const [absValue, setAbsValue] = useState<number>(() => getAbsValue(value))

  useEffect(() => {
    setAbsValue(getAbsValue(value))
  }, [typeof value === 'function' ? getValue(value) : value])

  return absValue
}
