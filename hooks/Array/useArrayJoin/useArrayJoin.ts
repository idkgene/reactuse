import { useMemo } from 'react';

/**
 * `Array.join` hook for React.
 *
 * Provides a memoized version of the `Array.join` method that joins all elements of an array into a string separated by the specified separator.
 *
 * @param {T[]} list - The array to join.
 * @param {string} [separator] - A string to separate each pair of adjacent elements of the array. If omitted, the array elements are separated by a comma (",").
 * @returns {string} A string with all array elements joined. If `list.length` is `0`, an empty string is returned.
 *
 * @example
 * const words = ['hello', 'world'];
 * const joinedWords = useArrayJoin(words, ' ');
 * console.log(joinedWords); // Output: 'hello world'
 *
 * @example
 * const numbers = [1, 2, 3];
 * const joinedNumbers = useArrayJoin(numbers, '-');
 * console.log(joinedNumbers); // Output: '1-2-3'
 */
function useArrayJoin<T>(list: T[], separator?: string): string {
  return useMemo(() => list.join(separator), [list, separator]);
}

export default useArrayJoin;
