import { useCallback, useEffect, useState } from 'react';

/**
 * Type representing the action to be dispatched in the `useGlobalState` hook.
 *
 * @param {S} S - The type of the state value.
 * @returns {S | ((prevState: S) => S)} The new state value or a function that
 */
type SetStateAction<S> = S | ((prevState: S) => S);

/**
 * Create a global state hook that allows multiple components to share and update a single state value.
 *
 * @param {S | (() => S)} initialState - The initial state value or a function
 * that returns the initial state value.
 * @returns {() => [S, (action: SetStateAction<S>) => void]} A custom hook
 * that returns the current state value and a function to update it.
 *
 * @example
 * Create a global state hook
 * const useGlobalCount = createGlobalState(0);
 */
export const createGlobalState = <S>(
  initialState: S | (() => S)
): (() => [S, (action: SetStateAction<S>) => void]) => {
  let globalState: S;
  const listeners = new Set<(state: S) => void>();

  if (typeof initialState === 'function') {
    globalState = (initialState as () => S)();
  } else {
    globalState = initialState;
  }

  const useGlobalState = (): [S, (action: SetStateAction<S>) => void] => {
    const [state, setState] = useState<S>(globalState);

    const dispatch = useCallback((action: SetStateAction<S>) => {
      if (action === null || action === undefined) {
        console.warn(
          'Dispatched action is null or undefined. Ignoring the dispatch.'
        );
        return;
      }

      const newState =
        typeof action === 'function'
          ? (action as (prevState: S) => S)(globalState)
          : action;

      if (newState === null || newState === undefined) {
        console.warn(
          'Dispatched action resulted in null or undefined state. Ignoring the dispatch.'
        );
        return;
      }

      globalState = newState;
      listeners.forEach(listener => listener(globalState));
    }, []);

    useEffect(() => {
      const listener = (state: S) => {
        setState(state);
      };

      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    }, []);

    return [state, dispatch];
  };

  return useGlobalState;
};
