import { useCallback, useEffect, useState } from "react";

type UpdateMaxFn = (newNumbers: number[]) => void;

export const useMax = (numbers: number[]): [number, UpdateMaxFn] => {
  const [max, setMax] = useState<number>(() => Math.max(...numbers));

  const updateMax: UpdateMaxFn = useCallback((newNumbers: number[]) => {
    setMax(Math.max(...newNumbers));
  }, []);

  useEffect(() => {
    updateMax(numbers);
  }, [numbers, updateMax]);

  return [max, updateMax];
};