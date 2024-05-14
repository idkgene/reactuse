import {  MutableRefObject } from 'react'

/**
 * Shorthand for accessing the current value of a ref.
 *
 * @param ref - The ref object to access the value from.
 * @returns The current value of the ref.
 */
export function getValue<T>(ref: MutableRefObject<T>): T {
  return ref.current
}

/**
 * Shorthand for accessing a specific property of the current value of a ref.
 *
 * @param ref - The ref object to access the value from.
 * @param key - The key of the property to access.
 * @returns The value of the specified property from the current ref value.
 */
export function getProperty<T, K extends keyof T>(
  ref: MutableRefObject<T>,
  key: K
): T[K] {
  return ref.current[key]
}
