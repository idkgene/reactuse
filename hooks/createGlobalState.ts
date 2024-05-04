import { useCallback, useState } from 'react';

export const createGlobalState = (initialState) => {
  let globalState = initialState;
  const listeners = new Set();

  const useGlobalState = () => {
    const [state, setState] = useState(globalState);

    const dispatch = useCallback((newState) => {
      globalState = typeof newState === 'function' ? newState(globalState) : newState;
      listeners.forEach((listener) => listener(globalState));
    }, []);

    useEffect(() => {
      listeners.add(setState);
      return () => {
        listeners.delete(setState);
      };
    }, []);

    return [state, dispatch];
  };

  return useGlobalState;
};