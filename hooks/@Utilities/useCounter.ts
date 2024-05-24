import { useState, useCallback } from 'react'

interface UseCounterOptions {
  /**
   * Minimum value for the counter.
   * @type {number}
   */
  min?: number
  /**
   * Maximum value for the counter.
   * @type {number}
   */
  max?: number
}

interface UseCounterResult {
  /**
   * The current count value.
   * @type {number}
   */
  count: number

  /**
   * Increments the count value by the specified delta.
   * @param {number} [delta=1] - The value to increment by. Defaults to 1.
   * @returns {void}
   */
  inc: (delta?: number) => void

  /**
   * Decrements the count value by the specified delta.
   * @param {number} [delta=1] - The value to decrement by. Defaults to 1.
   * @returns {void}
   */
  dec: (delta?: number) => void

  /**
   * Returns the current count value.
   * @returns {number} The current count value.
   */
  get: () => number

  /**
   * Sets the count to a specific value, respecting the optional min and max limits.
   * @param {number} value - The value to set the count to.
   * @returns {void}
   */
  set: (value: number) => void

  /**
   * Resets the count to the initial value or a specified value, respecting the optional min and max limits.
   * @param {number} [value=initialValue] - The value to reset the count to. Defaults to the initial value.
   * @returns {void}
   */
  reset: (value?: number) => void
}

/**
 * A custom hook to manage a counter state with optional minimum and maximum bounds.
 *
 * @param {number} [initialValue=0] - The initial value of the counter. Defaults to 0.
 * @param {UseCounterOptions} [options] - Optional configuration for the counter.
 * @param {number} [options.min] - Minimum value for the counter.
 * @param {number} [options.max] - Maximum value for the counter.
 * @returns {UseCounterResult} An object containing the current count and methods to manipulate it.
 *
 * @example
 * // Usage example:
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
