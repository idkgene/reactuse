import { useRef, useCallback } from 'react'

type FunctionArgs = any[]

type PromiseType<T extends FunctionArgs> = (...args: T) => Promise<void>

type CallbackType<T extends FunctionArgs> = (...args: T) => void

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param fn - A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *              to `callback` when the throttled-function is executed.
 * @param ms - A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param trailing - If true, call fn again after the time is up.
 * @param leading - If true, call fn on the leading edge of the ms timeout.
 * @param rejectOnCancel - If true, reject the last call if it's been cancel.
 * @returns A new, throttled, function.
 */
function useThrottleFn<T extends FunctionArgs>(
  fn: CallbackType<T>,
  ms = 200,
  trailing = true,
  leading = true,
  rejectOnCancel = false
): PromiseType<T> {
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const lastCallTimeRef = useRef<number>(0)
  const lastCallArgsRef = useRef<T>()
  const pendingRef = useRef(false)

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = undefined
    }
  }, [])

  const flush = useCallback(() => {
    if (pendingRef.current) {
      fn(...lastCallArgsRef.current!)
      lastCallArgsRef.current = undefined
      lastCallTimeRef.current = Date.now()
      pendingRef.current = false
    }
  }, [fn])

  const throttledFn = useCallback(
    (...args: T) => {
      return new Promise<void>((resolve, reject) => {
        const elapsed = Date.now() - lastCallTimeRef.current
        const shouldCall = elapsed > ms

        clear()

        if (shouldCall) {
          if (leading) {
            fn(...args)
            lastCallTimeRef.current = Date.now()
          } else {
            pendingRef.current = true
            lastCallArgsRef.current = args
          }

          resolve()
        } else {
          if (trailing) {
            pendingRef.current = true
            lastCallArgsRef.current = args

            timerRef.current = setTimeout(() => {
              flush()
              resolve()
            }, ms - elapsed)
          } else {
            if (rejectOnCancel) {
              reject()
            } else {
              resolve()
            }
          }
        }
      })
    },
    [clear, flush, fn, leading, ms, rejectOnCancel, trailing]
  )

  return throttledFn
}

export default useThrottleFn
