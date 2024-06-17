import { useRef, useState, useCallback } from 'react';

import type { Dispatch, SetStateAction } from 'react';

/**
 * Type representing the reset function to revert to the initial state.
 *
 * @param {T} T - The type of the state value.
 */
type ResetState = () => void;

/**
 * A custom hook that manages state with a reset function to revert to the initial state.
 *
 * @param {T | (() => T)} initialState - The initial state value or a function that returns the initial state.
 * @returns {[T, Dispatch<SetStateAction<T>>, ResetState]} An array containing:
 * - The current state value.
 * - A function to update the state value.
 * - A function to reset the state value to the initial state.
 *
 * @example
 * const [count, setCount, resetCount] = useResetState(0);
 *
 * Update the state
 * setCount(5);
 *
 * Reset the state to the initial value
 * resetCount(); // count will be 0
 */
export const useResetState = <T>(
  initialState: T | (() => T)
): [T, Dispatch<SetStateAction<T>>, ResetState] => {
  const initialStateRef = useRef<T | (() => T)>(initialState);
  const [state, setState] = useState<T>(
    typeof initialState === 'function'
      ? (initialState as () => T)()
      : initialState
  );

  const resetState = useCallback(() => {
    const newState =
      typeof initialStateRef.current === 'function'
        ? (initialStateRef.current as () => T)()
        : initialStateRef.current;
    setState(newState);
  }, []);

  return [state, setState, resetState];
};
