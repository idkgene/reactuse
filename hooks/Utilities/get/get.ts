import * as React from 'react';

/**
 * Retrieves the value of a mutable ref or a specific property of the ref's value.
 *
 * @param {MutableRefObject<T | null | undefined>} ref - The mutable ref object.
 * @param {K} [key] - Optional key to access a specific property of the ref's value.
 * @returns {T | T[K] | undefined} The value of the ref or the value of the specified property.
 * @template T - The type of the ref's value.
 * @template K - The type of the key to access a specific property of the ref's value.
 */
export function get<T, K extends keyof T>(
  ref: React.MutableRefObject<T | null | undefined>,
  key?: K
): T | T[K] | undefined {
  if (ref.current == null) {
    return undefined;
  }
  if (key !== undefined) {
    return ref.current[key];
  }
  return ref.current;
}
