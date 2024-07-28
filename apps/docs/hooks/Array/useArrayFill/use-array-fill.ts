import { useState, useCallback } from 'react';

type UseArrayFillResult<T> = [T[], (value: T) => void];

function useArrayFill<T>(initialArray: T[]): UseArrayFillResult<T> {
  const [array, setArray] = useState<T[]>(initialArray);

  const fillArray = useCallback((value: T) => {
    setArray((prevArray) => prevArray.map(() => value));
  }, []);

  return [array, fillArray];
}

export { useArrayFill };
