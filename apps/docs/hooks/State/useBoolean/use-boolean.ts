import { useState, useCallback } from 'react';
import type { SetStateAction, Dispatch } from 'react';

export type UseBooleanReturn = [
  boolean,
  () => void,
  Dispatch<SetStateAction<boolean>>,
];

export const useBoolean = (initialValue = false): UseBooleanReturn => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);

  return [value, toggle, setValue];
};
