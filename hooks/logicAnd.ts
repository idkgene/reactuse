import { useCallback, useEffect, useState } from "react";

type MaybeRefOrGetter<T> = T | (() => T);

/**
 * `AND` conditions for refs
 *
 * @param {...MaybeRefOrGetter<boolean>[]} args - The refs or getters to be ANDed together.
 * @returns {[boolean, (newValues: boolean[]) => void]} - An array containing the result of the AND operation and a function to update the values.
 */
export const logicAnd = (
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

  return [values.every((value) => value), updateValues];
};
