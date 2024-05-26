import { useMemo } from 'react'
import { MakeDestructurableResult } from '../utilities'
/**
 * @name useDestructurable
 * @description A React hook that combines an object and an array into a single destructurable
 * object, allowing for easy destructuring of both the object properties and array
 * elements.
 *
 * @return {MakeDestructurableResult<T, A>} An object that combines the properties
 *   of `obj` and the elements of `arr`, allowing for easy destructuring.
 *
 * @example
 * Usage example:
 * const { foo, bar, baz } = useDestructurable({ foo: 1, bar: 2 }, [3, 4]);
 * // foo === 1, bar === 2, baz === 3
 */
export function useDestructurable<
  T extends Record<string, unknown>,
  A extends readonly any[],
>(obj: T, arr: A): MakeDestructurableResult<T, A> {
  return useMemo(() => {
    return Object.assign({}, obj, { ...arr })
  }, [obj, arr])
}
