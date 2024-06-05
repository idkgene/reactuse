import { useMemo } from 'react';
import { UseArrayEveryPredicate } from '../array';

/**
 * `Array.every` hook for React.
 *
 * @param {T[]} list - The array to check.
 * @param predicate - A function to test each element.
 *
 * @returns {boolean} `true` if the `predicate` function returns a truthy value for every element from the array. Otherwise, `false`.
 */
export function useArrayEvery<T>(
  list: T[],
  predicate: UseArrayEveryPredicate<T>
): boolean {
  return useMemo(() => list.every(predicate), [list, predicate]);
}
