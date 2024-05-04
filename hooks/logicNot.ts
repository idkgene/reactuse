type MaybeRefOrGetter<T> = T | (() => T);

/**
 * `NOT` conditions for refs
 *
 * @param {MaybeRefOrGetter<boolean>} v - The ref or getter to be NOTed.
 * @returns {[boolean, (newValue: boolean) => void]} - An array containing the result of the NOT operation and a function to update the value.
 */
export const logicNot = (v: MaybeRefOrGetter<boolean>): boolean => {
  return !(typeof v === "function" ? v() : v);
};
