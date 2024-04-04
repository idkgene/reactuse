import { useCallback, useState } from 'react'

/**
 * @template T - The type of elements in the list.
 * @param {T[]} [defaultList=[]] - The initial list of elements.
 * @returns {[T[], { set: (l: T[]) => void, push: (element: T) => void, removeAt: (index: number) => void, insertAt: (index: number, element: T) => void, updateAt: (index: number, element: T) => void, clear: () => void }]} An array containing the list and an object with utility functions to manage the list.
 */

export function useList<T>(defaultList: T[] = []): [
  T[],
  {
    set: (l: T[]) => void
    push: (element: T) => void
    removeAt: (index: number) => void
    insertAt: (index: number, element: T) => void
    updateAt: (index: number, element: T) => void
    clear: () => void
  },
] {
  const [list, setList] = useState(defaultList)

  /**
   * @param {T[]} l - The new array to set as the list.
   */
  const set = useCallback((l: T[]) => {
    setList(l)
  }, [])

  /**
   * @param {T} element - The element to be added to the list.
   */
  const push = useCallback((element: T) => {
    setList((l) => [...l, element])
  }, [])

  /**
   * @param {number} index - The index of the element to be removed.
   */
  const removeAt = useCallback((index: number) => {
    setList((l) => [...l.slice(0, index), ...l.slice(index + 1)])
  }, [])

  /**
   * @param {number} index - The index at which the element should be inserted.
   * @param {T} element - The element to be inserted into the list.
   */
  const insertAt = useCallback((index: number, element: T) => {
    setList((l) => [...l.slice(0, index), element, ...l.slice(index)])
  }, [])

  /**
   * @param {number} index - The index of the element to be updated.
   * @param {T} element - The new element to replace the existing one.
   */
  const updateAt = useCallback((index: number, element: T) => {
    setList((l) => l.map((e, i) => (i === index ? element : e)))
  }, [])

  const clear = useCallback(() => setList([]), [])

  return [list, { set, push, removeAt, insertAt, updateAt, clear }]
}
