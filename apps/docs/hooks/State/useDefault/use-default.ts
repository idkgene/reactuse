import { useState, useCallback } from 'react';

export const useDefault = <T>(
  defaultValue: T | null,
): readonly [T | null, (newValue: T | null) => void] => {
  const [state, setState] = useState<T | null>(() => defaultValue);

  const setValue = useCallback(
    (newValue: T | null) => {
      setState(newValue !== null ? newValue : defaultValue);
    },
    [defaultValue],
  );

  return [state, setValue] as const;
};
