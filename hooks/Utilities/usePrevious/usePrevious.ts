import { useEffect, useRef } from 'react';

import { PreviousValue } from '../utilities';

/**
 * Returns the previous value of a given variable.
 *
 * @template T - The type of the value being tracked.
 * @param {T} value - The current value whose previous value is to be tracked.
 * @param {T} [initialValue] - An optional initial value to return before the first update.
 * @returns {PreviousValue<T>} The previous value of the given variable, or the initial value if provided.
 *
 * @example
 * Tracking the previous count value
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 * console.log(`Previous count: ${prevCount}, Current count: ${count}`);
 */
export function usePrevious<T>(value: T, initialValue?: T): PreviousValue<T> {
  const ref = useRef<T | undefined>(initialValue);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
