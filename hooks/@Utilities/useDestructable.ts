import { useMemo } from 'react'

/**
 * A React hook that combines an object and an array into a single destructurable
 * object, allowing for easy destructuring of both the object properties and array
 * elements.
 *
 * @template T The type of the object to be destructured.
 * @template A The type of the array to be destructured.
 * @param {T} obj The object to be destructured.
 * @param {A} arr The array to be destructured.
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

/**
 * A utility type that creates a destructurable object from a given object type `T`
 * and a given array type `A`.
 *
 * @template T The type of the object to be destructured.
 * @template A The type of the array to be destructured.
 * @typedef {Object} MakeDestructurableResult
 * @property {DestructurableObject<T>} The properties of the object `T`.
 * @property {DestructurableArray<A>} The elements of the array `A`.
 */
type MakeDestructurableResult<
  T extends Record<string, unknown>,
  A extends readonly any[],
> = DestructurableObject<T> & DestructurableArray<A>

/**
 * A utility type that creates a destructurable object from a given object type `T`.
 *
 * @template T The type of the object to be destructured.
 * @typedef {Object} DestructurableObject
 * @property {T[K]} The properties of the object `T`.
 */
type DestructurableObject<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K]
}

/**
 * A utility type that creates a destructurable array from a given array type `A`.
 *
 * @template A The type of the array to be destructured.
 * @typedef {Object} DestructurableArray
 * @property {A[K]} The elements of the array `A`.
 */
type DestructurableArray<T extends readonly any[]> = {
  [K in keyof T]: T[K]
}
