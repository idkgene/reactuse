import { useEffect, useRef } from 'react'
import { PreviousValue } from '../utilities'

/**
 * @name usePrevious
 * @description A custom hook to keep track of the previous value of a stage or prop.
 *
 * @returns {(T | undefined)} - The previous value of the state or prop.
 *
 * @example
 * Usage example:
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 *
 * useEffect(() => {
 *   console.log(`Current count: ${count}, Previous count: ${prevCount}`);
 * }, [count, prevCount]);
 */
export function usePrevious<T>(value: T, initialValue?: T): PreviousValue<T> {
  const ref = useRef<T | undefined>(initialValue)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
