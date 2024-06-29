import type { MutableRefObject } from 'react';

/**
 * Safely retrieves a value from a React ref object or a property of that object.
 *
 * @typeParam T - The type of the value stored in the ref.
 * @typeParam K - The type of the key, which must be a valid key of T.
 * @param ref - A mutable React ref object containing the target value.
 * @param key - Optional. A key to access a specific property of the ref's value.
 *
 * @returns The value stored in the ref, or the value of the specified property if a key is provided.
 *
 * @throws Error - Throws an error if the ref is null or undefined.
 * @throws Error - Throws an error if a key is provided but doesn't exist in the ref's value.
 *
 * @example
 * // Using with a ref to an object
 * ```tsx
 * const objRef = useRef({ name: 'John', age: 30 });
 * const name = get(objRef, 'name'); // Returns 'John'
 * const fullObj = get(objRef); // Returns { name: 'John', age: 30 }
 * ```
 *
 * @example
 * // Using with a ref to a primitive value
 * ```tsx
 * const numRef = useRef(42);
 * const value = get(numRef); // Returns 42
 * ```
 */
export function get<T, K extends keyof T>(
  ref: MutableRefObject<T | null | undefined>,
  key?: K,
): T | T[K] {
  if (ref.current === null || ref.current === undefined) {
    throw new Error('Ref is null or undefined');
  }

  if (key !== undefined) {
    if (typeof ref.current !== 'object' || !(key in ref.current)) {
      throw new Error(`Key "${String(key)}" does not exist in ref value`);
    }
    return ref.current[key];
  }

  return ref.current;
}
