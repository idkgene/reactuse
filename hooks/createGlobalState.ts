import { useCallback, useEffect, useState } from 'react';

type SetStateAction<S> = S | ((prevState: S) => S);

export const createGlobalState = <S>(initialState: S | (() => S)) => {
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
        console.warn('Dispatched action is null or undefined. Ignoring the dispatch.');
        return;
      }

      const newState = typeof action === 'function' ? (action as (prevState: S) => S)(globalState) : action;

      if (newState === null || newState === undefined) {
        console.warn('Dispatched action resulted in null or undefined state. Ignoring the dispatch.');
        return;
      }

      globalState = newState;
      listeners.forEach((listener) => listener(globalState));
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