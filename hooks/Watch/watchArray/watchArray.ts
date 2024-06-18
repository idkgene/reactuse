import { useRef, useEffect } from 'react';

/**
 * Type alias for the callback function used by `useArrayWatcher`.
 *
 * The callback function receives four arguments: the new array, the old array,
 * items added to the new array, and items removed from the old array.
 *
 * @template T
 * @callback WatchArrayCallback
 * @param {T[]} newArray - The new array after the change.
 * @param {T[]} oldArray - The array before the change.
 * @param {T[]} added - The items added to the new array.
 * @param {T[]} removed - The items removed from the old array.
 * @returns {void}
 */
type WatchArrayCallback<T> = (
  newArray: T[],
  oldArray: T[],
  added: T[],
  removed: T[]
) => void;

/**
 * Utility function to calculate the differences between two arrays.
 *
 * @template T
 * @param {T[]} arr1 - The first array.
 * @param {T[]} arr2 - The second array.
 * @returns {{ added: T[], removed: T[] }} An object containing arrays of added and removed items.
 *
 * @example
 * // Example usage of getArrayDifferences
 * const { added, removed } = getArrayDifferences([1, 2, 3], [2, 3, 4]);
 * console.log(added); // [4]
 * console.log(removed); // [1]
 */
function getArrayDifferences<T>(
  arr1: T[],
  arr2: T[]
): { added: T[]; removed: T[] } {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  return {
    added: arr2.filter(item => !set1.has(item)),
    removed: arr1.filter(item => !set2.has(item)),
  };
}

/**
 * Hook that monitors an array and triggers a callback when items are added or removed.
 *
 * @template T
 * @param {T[]} array - The array to monitor.
 * @param {WatchArrayCallback<T>} callback - The function to call when items are added or removed.
 * @returns {void}
 *
 * @example
 * // Example usage of useArrayWatcher
 * useArrayWatcher(someArray, (newArray, oldArray, added, removed) => {
 *   console.log('New array:', newArray);
 *   console.log('Old array:', oldArray);
 *   console.log('Items added:', added);
 *   console.log('Items removed:', removed);
 * });
 */
export function useArrayWatcher<T>(
  array: T[],
  callback: WatchArrayCallback<T>
): void {
  const prevArrayRef = useRef<T[]>([]);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      const { added, removed } = getArrayDifferences(
        prevArrayRef.current,
        array
      );

      if (added.length || removed.length) {
        callback(array, prevArrayRef.current, added, removed);
      }
    }

    prevArrayRef.current = [...array];
  }, [array, callback]);
}

export const watchArray = useArrayWatcher;