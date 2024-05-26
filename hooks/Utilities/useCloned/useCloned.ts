import { useRef, useEffect, useCallback } from 'react'
import { UseClonedOptions, UseClonedReturn } from '../utilities'
import { cloneFnJSON } from '@/lib/utils'

/**
 * @name useCloned
 * @description A React hook that creates a deep clone of an object and keeps it synchronized with the source object.
 *
 * @returns {UseClonedReturn<T>} An object containing the cloned object and a synchronization function.
 *
 * @example
 * const MyComponent = () => {
 *   const [state, setState] = useState({ count: 0 });
 *   const { cloned, sync } = useCloned(state);
 *
 *   // Modify the cloned object
 *   cloned.current.count++;
 *
 *   // Synchronize the state with the cloned object
 *   const handleClick = () => {
 *     sync();
 *     setState(cloned.current);
 *   };
 *
 *   return (
 *     <div>
 *       <p>State: {state.count}</p>
 *       <p>Cloned: {cloned.current.count}</p>
 *       <button onClick={handleClick}>Increment</button>
 *     </div>
 *   );
 * };
 */
export function useCloned<T>(
  source: T,
  options?: UseClonedOptions<T>
): UseClonedReturn<T> {
  const cloned = useRef<T>(
    options?.clone ? options.clone(source) : cloneFnJSON(source)
  )
  const { manual = false, clone = cloneFnJSON } = options || {}

  const sync = useCallback(() => {
    cloned.current = clone(source)
  }, [source, clone])

  useEffect(() => {
    if (!manual) {
      sync()
    }
  }, [source, manual, sync])

  return { cloned, sync }
}
