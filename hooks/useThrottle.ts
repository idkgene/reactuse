import { useEffect, useRef, useState } from 'react'
import { useUnmount } from './Component/useUnmount/useUnmout'

/**
 * @param {T} value - The value to be throttled.
 * @param {number} [ms=200] - The throttle delay in milliseconds.
 * @returns {T} The throttled value.
 */

export const useThrottle = <T>(value: T, ms: number = 200) => {
  const [state, setState] = useState<T>(value)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const nextValue = useRef<T | null>(null)
  const hasNextValue = useRef<boolean>(false)

  useEffect(() => {
    if (!timeout.current) {
      setState(value)
      const timeoutCallback = () => {
        if (hasNextValue.current) {
          hasNextValue.current = false
          setState(nextValue.current as T)
          timeout.current = setTimeout(timeoutCallback, ms)
        } else {
          timeout.current = undefined
        }
      }
      timeout.current = setTimeout(timeoutCallback, ms)
    } else {
      nextValue.current = value
      hasNextValue.current = true
    }
  }, [value, ms])

  useUnmount(() => {
    timeout.current && clearTimeout(timeout.current)
  })

  return state
}
