import { useState } from "react";

export type InitialValueType = string | number | boolean | object | null
export type StoredValue = InitialValueType
export type SetValue = (
  value: InitialValueType | ((val: InitialValueType) => InitialValueType),
) => void
export type RemoveValue = () => void

/**
 * @param {string} key - The key to use for storing and retrieving the value in session storage.
 * @param {InitialValueType} [initialValue] - The initial value to use if no value is found in session storage.
 * @returns {Readonly<[StoredValue, SetValue, RemoveValue]>} An array with three elements:
 *   - StoredValue: The current value stored in session storage for the given key.
 *   - SetValue: A function to update the value in session storage for the given key.
 *   - RemoveValue: A function to remove the value from session storage for the given key.
 */

export function useSessionStorage(
  key: string,
  initialValue?: InitialValueType,
): Readonly<[StoredValue, SetValue, RemoveValue]> {
  const [storedValue, setStoredValue] = useState<InitialValueType>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.sessionStorage.getItem(key)

      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = (
    value: InitialValueType | ((val: InitialValueType) => InitialValueType),
  ) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)

      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removeValue = () => {
    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(key)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue, removeValue] as const
}
