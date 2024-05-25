import { useState, useCallback, useRef } from 'react'

interface UseCycleListOptions<T> {
  /**
   * The initial value of the state.
   * A ref can be provided to reuse.
   */
  initialValue?: T
  /**
   * The default index when
   */
  fallbackIndex?: number
  /**
   * Custom function to get the index of the current value.
   */
  getIndexOf?: (value: T, list: T[]) => number
}

interface UseCycleListReturn<T> {
  state: T
  index: number
  next: (n?: number) => T
  prev: (n?: number) => T
  /**
   * Go to a specific index
   */
  go: (i: number) => T
}

function useCycleList<T>(
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

export default useCycleList
