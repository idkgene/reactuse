import { useState, useCallback, useRef } from 'react'
import { UseCycleListOptions, UseCycleListReturn } from '../utilities'

/**
 * @name useCycleList
 * @description A React hook that provides functionality to cycle through a list of items.
 *
 * @returns {UseCycleListReturn<T>} An object containing the current item, index, and functions to cycle through the list.
 *
 * @example
 * const MyComponent = () => {
 *   const items = ['apple', 'banana', 'orange'];
 *   const { state, next, prev } = useCycleList(items);
 *
 *   return (
 *     <div>
 *       <p>Current item: {state}</p>
 *       <button onClick={prev}>Previous</button>
 *       <button onClick={next}>Next</button>
 *     </div>
 *   );
 * };
 */
export function useCycleList<T>(
  list: T[],
  options?: UseCycleListOptions<T>
): UseCycleListReturn<T> {
  const {
    initialValue,
    fallbackIndex = 0,
    getIndexOf = (value: any, list: string | any[]) => list.indexOf(value),
  } = options || {}
  const listRef = useRef(list)
  const [state, setState] = useState(initialValue ?? list[fallbackIndex])
  const [index, setIndex] = useState(getIndexOf(state, list))

  const next = useCallback(
    (n = 1) => {
      const newIndex = (index + n) % listRef.current.length
      setIndex(newIndex)
      setState(listRef.current[newIndex])
      return listRef.current[newIndex]
    },
    [index]
  )

  const prev = useCallback(
    (n = 1) => {
      const newIndex =
        (index - n + listRef.current.length) % listRef.current.length
      setIndex(newIndex)
      setState(listRef.current[newIndex])
      return listRef.current[newIndex]
    },
    [index]
  )

  const go = useCallback((i: number) => {
    const newIndex = (i + listRef.current.length) % listRef.current.length
    setIndex(newIndex)
    setState(listRef.current[newIndex])
    return listRef.current[newIndex]
  }, [])

  return { state, index, next, prev, go }
}
