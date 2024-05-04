import { useCallback, useEffect, useState } from "react";

type MaybeRefOrGetter<T> = T | (() => T);

export const useAbs = (value: MaybeRefOrGetter<number>) => {
  const [absValue, setAbsValue] = useState(() =>
    Math.abs(typeof value === "function" ? value() : value),
  );

  useEffect(() => {
    setAbsValue(Math.abs(typeof value === "function" ? value() : value));
  }, [value]);

  return absValue;
};
