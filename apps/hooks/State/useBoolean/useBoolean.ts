import { useState, useCallback } from 'react';

import type { SetStateAction, Dispatch } from 'react';

/**
 * Type representing the return value of the `useBoolean` hook.
 *
 * @param {boolean} boolean - The current boolean value.
 * @param {() => void} toggle - A function to toggle the boolean value.
 * @param {Dispatch<SetStateAction<boolean>>} setValue - A function to set the boolean value directly.
 */
export type UseBooleanReturn = [
  boolean,
  () => void,
  Dispatch<SetStateAction<boolean>>,
];

/**
 * A custom hook to manage a boolean state value with a toggle function.
 *
 * @param {boolean} [initialValue=false] - The initial boolean value.
 * @returns {[boolean, () => void, Dispatch<SetStateAction<boolean>>]} An array containing:
 * - The current boolean value.
 * - A function to toggle the boolean value.
 * - A function to set the boolean value directly.
 *
 * @example
 * Example usage of useBoolean
 * const [isVisible, toggleVisibility, setVisibility] = useBoolean(false);
 *
 * Toggle the visibility
 * toggleVisibility();
 *
 * Set visibility to true directly
 * setVisibility(true);
 */
export const useBoolean = (initialValue = false): UseBooleanReturn => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prevValue => !prevValue);
  }, []);

  return [value, toggle, setValue];
};
