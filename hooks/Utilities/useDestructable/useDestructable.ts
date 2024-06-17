import { useMemo } from 'react';
import { MakeDestructibleResult as MakeDestructibleResult } from '../utilities';

/**
 *  Combines an object and an array into a destructible object, allowing both structured and array destructuring.
 *
 * @template T - The type of the object.
 * @template A - The type of the array.
 * @param {T} obj - An object whose properties will be included in the destructible result.
 * @param {A} arr - An array whose elements will be included in the destructible result.
 * @returns {MakeDestructibleResult<T, A>} A destructible object containing both the object properties and array elements.
 *
 * @example
 * const [firstName, lastName, { age, location }] = useDestructible(
 *   { age: 30, location: 'New York' },
 *   ['John', 'Doe']
 * );
 * console.log(firstName); // Output: 'John'
 * console.log(age); // Output: 30
 */
export function useDestructible<
  T extends Record<string, unknown>,
  A extends readonly any[],
>(obj: T, arr: A): MakeDestructibleResult<T, A> {
  return useMemo(() => {
    return Object.assign({}, obj, { ...arr });
  }, [obj, arr]);
}
