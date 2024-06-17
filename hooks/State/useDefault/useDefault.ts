import { useState, useCallback } from 'react';

/**
 * A custom hook that manages a state value with a fallback to a default value
 * if a new value is set to `null`.
 *
 * @param {T | null} defaultValue - The default value to fall back to if a new value is set to `null`.
 * @returns {[T | null, (newValue: T | null) => void]} An array containing:
 * - The current state value or the default value.
 * - A function to update the state value (falls back to default if `null` is passed).
 *
 * @example
 * const [value, setValue] = useDefault<string>('default');
 *
 * Set a new value
 * setValue('new value');
 *
 * Set to null, which will revert to the default value
 * setValue(null); // value will be 'default'
 */
export const useDefault = <T>(defaultValue: T | null) => {
  const [state, setState] = useState<T | null>(() => defaultValue);

  const setValue = useCallback(
    (newValue: T | null) => {
      setState(newValue !== null ? newValue : defaultValue);
    },
    [defaultValue]
  );

  return [state, setValue] as const;
};
