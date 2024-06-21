import { useRef, useEffect } from 'react';

import type { MutableRefObject } from 'react';

/**
 * Options for `useLastChanged` hook
 *
 * @param {number | null} [options.initialValue=null] - The initial timestamp value or `null`.
 * @param {(prev: T, next: T) => boolean} [options.equalityFn] - Custom equality function to compare values.
 */
interface UseLastChangedOptions<T> {
  initialValue?: number | null;
  equalityFn?: (prev: T, next: T) => boolean;
}

/**
 * A custom hook that returns a mutable ref containing the timestamp of the last change
 * of the provided source value.
 *
 * @param {T} source - The source value to monitor for changes.
 * @param {UseLastChangedOptions<T>} [options={}] - Optional configuration options.
 * @returns {MutableRefObject<number | null>} A ref containing the timestamp of the last change.
 *
 * @example
 * // Example usage of useLastChanged
 * const MyComponent = () => {
 *   const [value, setValue] = useState(0);
 *   const lastChanged = useLastChanged(value);
 *
 *   return (
 *     <div>
 *       <p>Last changed: {lastChanged.current}</p>
 *       <button onClick={() => setValue(prev => prev + 1)}>Increment</button>
 *     </div>
 *   );
 * };
 */
export function useLastChanged<T>(
  source: T,
  options: UseLastChangedOptions<T> = {}
): MutableRefObject<number | null> {
  const { initialValue = null, equalityFn } = options;
  const lastChanged = useRef<number | null>(initialValue);
  const prevSource = useRef<T>(source);

  useEffect(() => {
    const isEqual = equalityFn
      ? equalityFn(prevSource.current, source)
      : prevSource.current === source;

    if (!isEqual) {
      lastChanged.current = Date.now();
      prevSource.current = source;
    }
  }, [source, equalityFn]);

  return lastChanged;
}
