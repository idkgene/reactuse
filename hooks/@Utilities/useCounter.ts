import { useState, useCallback } from 'react'

interface UseCounterOptions {
  min?: number
  max?: number
}

interface UseCounterResult {
  count: number
  inc: (delta?: number) => void
  dec: (delta?: number) => void
  get: () => number
  set: (value: number) => void
  reset: (value?: number) => void
}

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

