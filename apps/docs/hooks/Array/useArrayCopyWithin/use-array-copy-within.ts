import { useState, useCallback } from 'react';

interface ArrayCopyWithinReturn<T> {
  array: T[];
  copyWithin: (target: number, start: number, end?: number) => void;
}

function useArrayCopyWithin<T>(
  initialArray: T[],
): ArrayCopyWithinReturn<T> {
  const [array, setArray] = useState<T[]>(initialArray);

  const copyWithin = useCallback(
    (target: number, start: number, end?: number) => {
      setArray((currentArray) => {
        const newArray = [...currentArray];
        newArray.copyWithin(target, start, end);
        return newArray;
      });
    },
    [],
  );

  return { array, copyWithin };
}

export { useArrayCopyWithin };
