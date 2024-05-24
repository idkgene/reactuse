import { useState, useCallback, useEffect, useRef } from 'react'

interface UseTimeoutPollOptions {
  /**
   * Indicates whether the polling should start immediately.
   * @type {boolean}
   * @default true
   */
  immediate?: boolean
}

interface Pausable {
  /**
   * Indicates whether the polling is currently active.
   * @type {boolean}
   */
  isActive: boolean

  /**
   * Pauses the polling.
   * @returns {void}
   */
  pause: () => void

  /**
   * Resumes the polling.
   * @returns {void}
   */
  resume: () => void
}

/**
 * A custom hook to repeatedly execute a function at specified intervals, with the ability to pause and resume.
 *
 * @param {() => Promise<void>} fn - The asynchronous function to be executed at each interval.
 * @param {number} interval - The interval in milliseconds at which the function should be executed.
 * @param {UseTimeoutPollOptions} [options] - Optional configuration for the polling.
 * @param {boolean} [options.immediate=true] - Whether to start polling immediately.
 * @returns {Pausable} An object containing the current polling status and methods to pause and resume.
 *
 * @example
 * // Usage example:
 * const { isActive, pause, resume } = useTimeoutPoll(async () => {
 *   console.log('Polling...');
 * }, 1000, { immediate: true });
 *
 * // Pause the polling
 * pause();
 *
 * // Resume the polling
 * resume();
 */
export function useTimeoutPoll(
  fn: () => Promise<void>,
  interval: number,
  options?: UseTimeoutPollOptions
): Pausable {
  const { immediate = true } = options || {}

  const [isActive, setIsActive] = useState(immediate)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const execute = useCallback(async () => {
    if (!isActive) return
    await fn()
    if (isActive) {
      timeoutRef.current = setTimeout(execute, interval)
    }
  }, [fn, interval, isActive])

  const pause = useCallback(() => {
    setIsActive(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const resume = useCallback(() => {
    if (!isActive) {
      setIsActive(true)
      timeoutRef.current = setTimeout(execute, interval)
    }
  }, [execute, interval, isActive])

  useEffect(() => {
    if (immediate) {
      timeoutRef.current = setTimeout(execute, interval)
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [execute, interval, immediate])

  return { isActive, pause, resume }
}
