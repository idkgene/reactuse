import { useMemo } from 'react';

/**
 * A React hook that provides a memoized implementation of the 
 * [`Array.prototype.join`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) method.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} list - The array to join. If `list` is not an array, the hook returns an empty string.
 * @param {string} [separator] - A string to separate each pair of adjacent elements of the array. If omitted, the array elements are separated by a comma (",").
 * @returns {string} A string with all array elements joined. If `list.length` is `0`, an empty string is returned.
 *
 * @example
 * // Joining words with a space separator
 * import { useArrayJoin } from './useArrayJoin';
 *
 * const words = ['hello', 'world'];
 * const joinedWords = useArrayJoin(words, ' ');
 * console.log(joinedWords); // Output: 'hello world'
 *
 * @example
 * // Joining numbers with a dash separator
 * const numbers = [1, 2, 3];
 * const joinedNumbers = useArrayJoin(numbers, '-');
 * console.log(joinedNumbers); // Output: '1-2-3'
 */
export function useArrayJoin<T>(list: T[], separator?: string): string {
  return useMemo(() => list.join(separator), [list, separator]);
}
