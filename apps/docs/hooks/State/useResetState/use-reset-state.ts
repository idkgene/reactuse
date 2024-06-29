import { useRef, useState, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';

type ResetState = () => void;

export const useResetState = <T>(
  initialState: T | (() => T),
): [T, Dispatch<SetStateAction<T>>, ResetState] => {
  const initialStateRef = useRef<T | (() => T)>(initialState);
  const [state, setState] = useState<T>(
    typeof initialState === 'function'
      ? (initialState as () => T)()
      : initialState,
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
