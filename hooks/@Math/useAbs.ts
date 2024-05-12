import { useEffect, useState } from 'react'

type MaybeRefOrGetter<T> = T | (() => T)

/**
 * A custom React hook that returns the absolute value of a number.
 * @param {MaybeRefOrGetter<number>} value - The number to get the absolute value of.
 * @returns {number} The absolute value of the number.
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

  const [absValue, setAbsValue] = useState<number>(() =>
    Math.abs(getValue(value))
  )

  useEffect(() => {
    try {
      setAbsValue(Math.abs(getValue(value)))
    } catch (error) {
      console.error('useAbs error:', error)
    }
  }, [value])

  return absValue
}
