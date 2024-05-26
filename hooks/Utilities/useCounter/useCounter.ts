import { useState, useCallback } from 'react'
import { UseCounterOptions, UseCounterResult } from '../utilities'

/**
 * @name useCounter
 * @description Custom hook to manage a counter state with optional minimum and maximum bounds.
 *
 * @returns {UseCounterResult} An object containing the current count and methods to manipulate it.
 *
 * @example
 * Usage example:
 * const { count, inc, dec, reset } = useCounter(10, { min: 0, max: 100 });
 * inc();  // Increments count by 1
 * dec(2); // Decrements count by 2
 * reset(); // Resets count to 10
 */
export function useCounter(
  initialValue: number = 0,
  options?: UseCounterOptions
): UseCounterResult {
  const { min, max } = options || {}

  const [count, setCount] = useState(initialValue)

  const inc = useCallback(
    (delta: number = 1) => {
      setCount((prev) => {
        const newValue = prev + delta
        return max !== undefined ? Math.min(newValue, max) : newValue
      })
    },
    [max]
  )

  const dec = useCallback(
    (delta: number = 1) => {
      setCount((prev) => {
        const newValue = prev - delta
        return min !== undefined ? Math.max(newValue, min) : newValue
      })
    },
    [min]
  )

  const get = useCallback(() => count, [count])

  const set = useCallback(
    (value: number) => {
      setCount(() => {
        if (min !== undefined && value < min) return min
        if (max !== undefined && value > max) return max
        return value
      })
    },
    [min, max]
  )

  const reset = useCallback(
    (value: number = initialValue) => {
      setCount(() => {
        if (min !== undefined && value < min) return min
        if (max !== undefined && value > max) return max
        return value
      })
    },
    [initialValue, min, max]
  )

  return { count, inc, dec, get, set, reset }
}
