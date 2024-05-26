import { MutableRefObject } from 'react'

/**
 * @name getValue
 * @description Retrieves the current value stored in a gived mutable reference.
 *
 * @param {MutableRefObject<T>} ref - The mutable reference object holding the value.
 * @returns {T} The current value of the reference
 *
 * @example
 * Usage example:
 * const myRef = useRef<number>(0);
 * const value = getValue(myRef); // value will be 0
 */
export function getValue<T>(ref: MutableRefObject<T>): T {
  return ref.current
}

/**
 * @name getProperty
 * @description Retrieves specific property from the current value stored ina given mutable reference.
 * 
 * @returns {T[K]} - The value of the specified property.
 * 
 * @example
 * type Person = { name: string; age: number; };
 * const personRef = useRef<Person>({ name: 'Alex', age: 20 });
 * const name = getProperty(personRef, 'name');  // name will be 'Alex'
 */
export function getProperty<T, K extends keyof T>(
  ref: MutableRefObject<T>,
  key: K
): T[K] {
  return ref.current[key]
}
