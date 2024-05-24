import { useEffect, useRef } from 'react'

/**
 * A custom hook to keep track of the previous value of a stage or prop.
 *
 * @template T - The type of the value being tracked.
 * @param {T} value - The current value to track.
 * @param {T} [initialValue] - An optional initial value for the previous value.
 * @returns {(T | undefined)} - The previous value of the state or prop.
 *
 * @example
 * // Usage example:
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 *
 * useEffect(() => {
 *   console.log(`Current count: ${count}, Previous count: ${prevCount}`);
 * }, [count, prevCount]);
 */
export function usePrevious<T>(value: T, initialValue?: T): T | undefined {
  const ref = useRef<T | undefined>(initialValue)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
