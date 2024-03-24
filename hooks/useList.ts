import { useCallback, useState } from 'react'

/**
 * A custom React hook that provides a list and utility functions to manage the list.
 *
 * @template T - The type of elements in the list.
 * @param {T[]} [defaultList=[]] - The initial list of elements.
 * @returns {[T[], { set: (l: T[]) => void, push: (element: T) => void, removeAt: (index: number) => void, insertAt: (index: number, element: T) => void, updateAt: (index: number, element: T) => void, clear: () => void }]} An array containing the list and an object with utility functions to manage the list.
 */

export function useList<T>(defaultList: T[] = []) {
  const [list, setList] = useState(defaultList)

  /**
   * A memoized function to set the list to a new array.
   *
   * @param {T[]} l - The new array to set as the list.
   */
  const set = useCallback((l: T[]) => {
    setList(l)
  }, [])

  /**
   * A memoized function to add a new element to the end of the list.
   *
   * @param {T} element - The element to be added to the list.
   */
  const push = useCallback((element: T) => {
    setList((l) => [...l, element])
  }, [])

  /**
   * A memoized function to remove an element from the list at a specific index.
   *
   * @param {number} index - The index of the element to be removed.
   */
  const removeAt = useCallback((index: number) => {
    setList((l) => [...l.slice(0, index), ...l.slice(index + 1)])
  }, [])

  /**
   * A memoized function to insert an element into the list at a specific index.
   *
   * @param {number} index - The index at which the element should be inserted.
   * @param {T} element - The element to be inserted into the list.
   */
  const insertAt = useCallback((index: number, element: T) => {
    setList((l) => [...l.slice(0, index), element, ...l.slice(index)])
  }, [])

  /**
   * A memoized function to update an element in the list at a specific index.
   *
   * @param {number} index - The index of the element to be updated.
   * @param {T} element - The new element to replace the existing one.
   */
  const updateAt = useCallback((index: number, element: T) => {
    setList((l) => l.map((e, i) => (i === index ? element : e)))
  }, [])

  /**
   * A memoized function to clear the list and set it to an empty array.
   */
  const clear = useCallback(() => setList([]), [])

  return [list, { set, push, removeAt, insertAt, updateAt, clear }]
}
