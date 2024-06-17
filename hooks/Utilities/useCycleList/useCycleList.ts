import { useState, useCallback, useRef } from 'react';
import { UseCycleListOptions, UseCycleListReturn } from '../utilities';

/**
 * Cycles through a list of items, providing navigation functions to go to the next, previous, or a specific index.
 *
 * @template T - The type of items in the list.
 * @param {T[]} list - The list of items to cycle through.
 * @param {UseCycleListOptions<T>} [options] - Options for customizing the cycle behavior.
 * @param {T} [options.initialValue] - The initial value to start at.
 * @param {number} [options.fallbackIndex=0] - The index to fall back to if the initial value is not found in the list.
 * @param {(value: T, list: T[]) => number} [options.getIndexOf] - A function to find the index of an item in the list.
 * @returns {UseCycleListReturn<T>} An object containing the current state, index, and navigation functions.
 *
 * @example
 * Cycle through a list of colors
 * const colors = ['red', 'green', 'blue'];
 * const { state: currentColor, next, prev, go } = useCycleList(colors, { initialValue: 'green' });
 * console.log(currentColor); // Output: 'green'
 * next();
 * console.log(currentColor); // Output: 'blue'
 * prev();
 * go(0);
 */
export function useCycleList<T>(
  list: T[],
  options?: UseCycleListOptions<T>
): UseCycleListReturn<T> {
  const {
    initialValue,
    fallbackIndex = 0,
    getIndexOf = (value: any, list: string | any[]) => list.indexOf(value),
  } = options || {};
  const listRef = useRef(list);
  const [state, setState] = useState(initialValue ?? list[fallbackIndex]);
  const [index, setIndex] = useState(getIndexOf(state, list));

  const next = useCallback(
    (n = 1) => {
      const newIndex = (index + n) % listRef.current.length;
      setIndex(newIndex);
      setState(listRef.current[newIndex]);
      return listRef.current[newIndex];
    },
    [index]
  );

  const prev = useCallback(
    (n = 1) => {
      const newIndex =
        (index - n + listRef.current.length) % listRef.current.length;
      setIndex(newIndex);
      setState(listRef.current[newIndex]);
      return listRef.current[newIndex];
    },
    [index]
  );

  const go = useCallback((i: number) => {
    const newIndex = (i + listRef.current.length) % listRef.current.length;
    setIndex(newIndex);
    setState(listRef.current[newIndex]);
    return listRef.current[newIndex];
  }, []);

  return { state, index, next, prev, go };
}
