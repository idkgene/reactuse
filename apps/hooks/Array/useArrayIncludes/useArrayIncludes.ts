import { useMemo } from 'react';

import { UseArrayIncludesOptions } from '../array';

/**
 * A React hook that provides a memoized implementation of the
 * [`Array.prototype.includes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) method.
 *
 * @template T - The type of elements in the array.
 * @template V - The type of the value being searched for.
 * @param {T[]} list - The array to search. If `list` is not an array, the hook returns `false`.
 * @param {V} value - The value to search for.
 * @param {UseArrayIncludesOptions<T, V>} [options] - Additional options for the search.
 * @returns {boolean} `true` if the `value` is found in the array, otherwise `false`.
 *
 * @example
 * // Checking if a number is included in a list
 * import { useArrayIncludes } from './useArrayIncludes';
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const includesNumber = useArrayIncludes(numbers, 3);
 * console.log(includesNumber); // Output: true
 *
 * @example
 * // Using a key comparator to find an item by ID
 * const items = [{ id: 1, name: 'item1' }, { id: 2, name: 'item2' }];
 * const options = { comparator: 'id' };
 * const includesItem = useArrayIncludes(items, 2, options);
 * console.log(includesItem); // Output: true
 *
 * @example
 * // Using a custom comparator function to find an object by key
 * const objects = [{ key: 'a' }, { key: 'b' }];
 * const customComparator = (element: { key: string }, value: string) => element.key === value;
 * const includesObject = useArrayIncludes(objects, 'a', { comparator: customComparator });
 * console.log(includesObject); // Output: true
 */
export function useArrayIncludes<T, V = T>(
  list: T[],
  value: V,
  options?: UseArrayIncludesOptions<T, V>
): boolean {
  const { fromIndex = 0, comparator } = options || {};

  return useMemo(() => {
    if (Array.isArray(list) && list.length === 0) {
      return false;
    }

    if (typeof comparator === 'function') {
      return list.some((element, index, array) =>
        comparator(element, value, index, array)
      );
    } else if (typeof comparator === 'string') {
      if (
        typeof list[0] === 'object' &&
        list[0] !== null &&
        !(comparator in list[0])
      ) {
        console.error(`Invalid comparator key: ${comparator}`);
        return false;
      }

      return list.some(element => element[comparator as keyof T] === value);
    } else if (typeof fromIndex === 'number' && fromIndex >= 0 && !comparator) {
      return list.includes(value as unknown as T, fromIndex);
    } else {
      console.error('Invalid options provided to useArrayIncludes.');
      return false;
    }
  }, [list, value, fromIndex, comparator]);
}
