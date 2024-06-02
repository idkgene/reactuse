import { useCallback, useEffect, useRef, useState } from 'react'
import { UseIntervalOptions, UseIntervalControls } from '../animation'

/**
 * Custom hook that runs a callback fn at a specified interval
 *
 * @returns {UseIntervalControls} An object containing the current count and functions to reset, pause, and resume the interval.
 * @property {number} counter - The current count of intervals that have elapsed.
 * @property {() => void} reset - A function to reset the counter to 0.
 * @property {() => void} pause - A function to pause the interval.
 * @property {() => void} resume - A function to resume the interval.
 *
 * @example
 * const { counter, reset, pause, resume } = useInterval(1000)
 */
export function useInterval(
  interval: number,
  options?: UseIntervalOptions
): UseIntervalControls {
  const { immediate = true, callback } = options || {}

  const [counter, setCounter] = useState(0)
  const [isRunning, setIsRunning] = useState(immediate)
  const savedCallback = useRef<(count: number) => void>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  const reset = useCallback(() => {
    setCounter(0)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const resume = useCallback(() => {
    setIsRunning(true)
  }, [])

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const id = setInterval(() => {
      const newCounter = counter + 1
      setCounter(newCounter)
      savedCallback.current?.(newCounter)
    }, interval)

    return () => clearInterval(id)
  }, [counter, interval, isRunning])

  return { counter, reset, pause, resume }
}
