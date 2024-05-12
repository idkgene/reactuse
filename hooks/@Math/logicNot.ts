type MaybeRefOrGetter<T> = T | (() => T)

/**
 * `NOT` conditions for refs
 *
 * @param {MaybeRefOrGetter<boolean>} v - The ref or getter to be NOTed.
 * @returns {[boolean, (newValue: boolean) => void]} - An array containing the result of the NOT operation and a function to update the value.
 */
export function logicNot<T extends boolean>(value: MaybeRefOrGetter<T>): T {
  const resolvedValue = typeof value === 'function' ? value() : value

  if (typeof resolvedValue !== 'boolean') {
    throw new Error(
      'logicNot: Expected a boolean or a function that returns a boolean.'
    )
  }

  return !resolvedValue as T
}
