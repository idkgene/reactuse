import { useEffect, useState, useCallback } from "react";

type MaybeRefOrGetter<T> = T | (() => T);

export const logicOr = (
  ...args: MaybeRefOrGetter<boolean>[]
): [boolean, (newValues: boolean[]) => void] => {
  const [values, setValues] = useState<boolean[]>(
    args.map((arg) => {
      if (typeof arg === "function") {
        return arg();
      }
      return arg;
    }),
  );

  const updateValues = useCallback((newValues: boolean[]) => {
    setValues(newValues);
  }, []);

  useEffect(() => {
    updateValues(
      args.map((arg) => {
        if (typeof arg === "function") {
          return arg();
        }
        return arg;
      }),
    );
  }, [args, updateValues]);

  return [values.some((value) => value), updateValues];
};
