import { useCallback, useEffect, useState } from 'react'

type MaybeRefOrGetter<T> = T | (() => T)

/**
 * `AND` conditions for refs
 *
 * @param {...MaybeRefOrGetter<boolean>[]} args - The refs or getters to be ANDed together.
 * @returns {[boolean, (newValues: boolean[]) => void]} - An array containing the result of the AND operation and a function to update the values.
 */
export function useLogicAnd(
  ...args: MaybeRefOrGetter<boolean>[]
): [boolean, (newValues: boolean[]) => void] {
  const [values, setValues] = useState<boolean[]>(() =>
    args.map((arg) => (typeof arg === 'function' ? arg() : arg))
  )

  const updateValues = useCallback((newValues: boolean[]) => {
    setValues(newValues)
  }, [])

  useEffect(() => {
    updateValues(args.map((arg) => (typeof arg === 'function' ? arg() : arg)))
  }, [args, updateValues])

  return [values.every(Boolean), updateValues]
}
