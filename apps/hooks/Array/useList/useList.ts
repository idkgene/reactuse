import { useState, useCallback } from 'react';

/**
 * Utility functions for managing a list.
 *
 * @template T - The type of elements in the list.
 */
export interface UseListActions<T> {
  /**
   * Sets a new list, replacing the existing one.
   *
   * @param {T[]} l - The new array to set as the list.
   */
  set: (l: T[]) => void;

  /**
   * Adds a new element to the end of the list.
   *
   * @param {T} element - The element to be added to the list.
   */
  push: (element: T) => void;

  /**
   * Removes the element at the specified index.
   *
   * @param {number} index - The index of the element to be removed.
   */
  removeAt: (index: number) => void;

  /**
   * Inserts an element at the specified index.
   *
   * @param {number} index - The index at which the element should be inserted.
   * @param {T} element - The element to be inserted into the list.
   */
  insertAt: (index: number, element: T) => void;

  /**
   * Updates the element at the specified index.
   *
   * @param {number} index - The index of the element to be updated.
   * @param {T} element - The new element to replace the existing one.
   */
  updateAt: (index: number, element: T) => void;

  /**
   * Clears the list by setting it to an empty array.
   */
  clear: () => void;
}

/**
 * A hook providing a list and utility functions for managing it.
 *
 * @template T - The type of elements in the list.
 * @param {T[]} [defaultList=[]] - The initial list of elements.
 * @returns {[T[], UseListActions<T>]} An array containing:
 *  - The current state of the list.
 *  - An object containing utility functions to manage the list.
 *
 * @example
 * // Managing a list of numbers
 * import { useList } from './useList';
 *
 * const [list, { set, push, removeAt, insertAt, updateAt, clear }] = useList<number>([1, 2, 3]);
 * push(4); // list is now [1, 2, 3, 4]
 * removeAt(1); // list is now [1, 3, 4]
 * insertAt(1, 2); // list is now [1, 2, 3, 4]
 * updateAt(2, 5); // list is now [1, 2, 5, 4]
 * clear(); // list is now []
 *
 * @example
 * // Managing a list of objects
 * const [people, { push }] = useList<{ name: string }>({ name: 'Alice' });
 * push({ name: 'Bob' }); // people is now [{ name: 'Alice' }, { name: 'Bob' }]
 */
export function useList<T>(defaultList: T[] = []): [T[], UseListActions<T>] {
  const [list, setList] = useState(defaultList);

  const set = useCallback((l: T[]) => {
    setList(l);
  }, []);

  const push = useCallback((element: T) => {
    setList(l => [...l, element]);
  }, []);

  const removeAt = useCallback((index: number) => {
    setList(l => [...l.slice(0, index), ...l.slice(index + 1)]);
  }, []);

  const insertAt = useCallback((index: number, element: T) => {
    setList(l => [...l.slice(0, index), element, ...l.slice(index)]);
  }, []);

  const updateAt = useCallback((index: number, element: T) => {
    setList(l => l.map((e, i) => (i === index ? element : e)));
  }, []);

  const clear = useCallback(() => setList([]), []);

  return [list, { set, push, removeAt, insertAt, updateAt, clear }];
}