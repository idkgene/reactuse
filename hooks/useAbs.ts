import { useCallback, useEffect, useState } from "react";

type MaybeRefOrGetter<T> = T | (() => T);

/**
 * A custom React hook that returns the absolute value of a number.
 * @param {MaybeRefOrGetter<number>} value - The number to get the absolute value of.
 * @returns {number} The absolute value of the number.
 */
export const useAbs = (value: MaybeRefOrGetter<number>) => {
  const [absValue, setAbsValue] = useState(() =>
    Math.abs(typeof value === "function" ? value() : value),
  );

  useEffect(() => {
    setAbsValue(Math.abs(typeof value === "function" ? value() : value));
  }, [value]);

  return absValue;
};
