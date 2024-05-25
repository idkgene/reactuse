import { useCallback, useEffect, useRef, useState } from 'react'

interface UseIntervalOptions {
  /**
   * Выполнить обновление сразу после вызова
   *
   * @default true
   */
  immediate?: boolean
  /**
   * Callback-функция, вызываемая на каждом интервале
   */
  callback?: (count: number) => void
}

interface UseIntervalControls {
  counter: number
  reset: () => void
  pause: () => void
  resume: () => void
}

/**
 * Реактивный счетчик, увеличивающийся на каждом интервале
 *
 * @param interval - Интервал в миллисекундах
 * @param options - Опции хука
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
