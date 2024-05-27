import { useCallback, useEffect, useRef, useState } from 'react'
import { UseIntervalOptions, UseIntervalControls } from '../animation'

/**
 * @name useInterval
 * @description Custom hook that runs a callback fn at a specified interval
 *
 * @returns {UseIntervalControls} An object containing the current count and functions to reset, pause, and resume the interval.
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
