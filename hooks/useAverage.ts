import { useCallback, useEffect, useState } from "react";

type MaybeRefOrGetter<T> = T | (() => T);

export const useAverage = (...args: MaybeRefOrGetter<number>[]): number => {
  const [averageValue, setAverageValue] = useState(() => {
    const values = args.map((arg) => typeof arg === "function" ? arg() : arg);
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  });

  const updateValues = useCallback((newValues: number[]) => {
    setAverageValue(newValues.reduce((sum, value) => sum + value, 0) / newValues.length);
  }, []);

  useEffect(() => {
    const values = args.map((arg) => typeof arg === "function" ? arg() : arg);
    updateValues(values);
  }, [args, updateValues]);

  return averageValue;
};