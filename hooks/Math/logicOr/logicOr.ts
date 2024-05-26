import { useEffect, useState, useCallback } from 'react'

type MaybeRefOrGetter<T> = T | (() => T)

/**
 * A custom React hook that returns a boolean indicating if any of the provided refs or getters are true.
 * @param {...MaybeRefOrGetter<boolean>} args - The refs or getters to be ORed together.
 * @returns {[boolean, (newValues: boolean[]) => void]} An array containing the result of the OR operation and a function to update the values.
 */
export const useLogicOr = (
  ...args: MaybeRefOrGetter<boolean>[]
): [boolean, (newValues: boolean[]) => void] => {
  const [values, setValues] = useState<boolean[]>(() =>
    args.map((arg) => {
      if (typeof arg === 'function') {
        return arg()
      }
      return arg
    })
  )

  const updateValues = useCallback((newValues: boolean[]) => {
    setValues(newValues)
  }, [])

  useEffect(() => {
    updateValues(
      args.map((arg) => {
        if (typeof arg === 'function') {
          return arg()
        }
        return arg
      })
    )
  }, [args, updateValues])

  return [values.some((value) => value), updateValues]
}
