import { useEffect, useRef, useState } from 'react'
import { UseDebounceOptions } from '../utilities'

/**
 * @name useDebounce
 * @description A React hook that debounces the value of a state variable.
 *
 * @returns {T} The debounced value.
 *
 * @example
 * const MyComponent = () => {
 *   const [value, setValue] = useState('');
 *   const debouncedValue = useDebounce(value, 500);
 *
 *   const handleChange = (event) => {
 *     setValue(event.target.value);
 *   };
 *
 *   return (
 *     <div>
 *       <input type="text" value={value} onChange={handleChange} />
 *       <p>Debounced value: {debouncedValue}</p>
 *     </div>
 *   );
 * };
 */
export function useDebounce<T>(
  value: T,
  delay: number = 500,
  options: UseDebounceOptions<T> = {}
): T {
  const { initialValue = value, shouldDebounce } = options
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue)
  const prevValue = useRef<T>(value)

  useEffect(() => {
    const shouldTriggerDebounce = shouldDebounce
      ? shouldDebounce(prevValue.current, value)
      : prevValue.current !== value

    if (shouldTriggerDebounce) {
      const timer = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(timer)
      }
    }

    prevValue.current = value
  }, [value, delay, shouldDebounce])

  return debouncedValue
}
