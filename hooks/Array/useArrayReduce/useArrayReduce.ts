import { useMemo } from 'react';

type UseArrayReducer<PV, CV, R> = (
  previousValue: PV,
  currentValue: CV,
  currentIndex: number
) => R;

/**
 * `Array.reduce` hook for React.
 *
 * Provides a memoized version of the `Array.reduce` method that applies a reducer function to each element of the array, resulting in a single output value.
 *
 * @param {T[]} list - The array to reduce.
 * @param {UseArrayReducer<U, T, U>} reducer - A "reducer" function that accumulates the array elements.
 * @param {U} initialValue - A value to initialize the accumulator the first time the callback is called.
 * @returns {U} The value that results from running the "reducer" callback function to completion over the entire array.
 *
 * @example
 * const numbers = [1, 2, 3, 4];
 * const sum = useArrayReduce(numbers, (accumulator, number) => accumulator + number, 0);
 * console.log(sum); // Output: 10
 *
 * @example
 * const objects = [{ count: 1 }, { count: 2 }];
 * const totalCount = useArrayReduce(objects, (accumulator, obj) => accumulator + obj.count, 0);
 * console.log(totalCount); // Output: 3
 */
export function useArrayReduce<T, U>(
  list: T[],
  reducer: UseArrayReducer<U, T, U>,
  initialValue: U
): U {
  return useMemo(
    () => list.reduce(reducer, initialValue),
    [list, reducer, initialValue]
  );
}
