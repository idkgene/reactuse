import { useState, useCallback, useRef } from 'react'
import type { Dispatch, SetStateAction } from 'react'

type ResetState = () => void

/**
 * @name useResetState
 * @description Allows for managing state with a reset function in React components. *
 *
 * @returns The `useResetState` custom hook returns an array with 3 elements:
 * 1. The current state value of type `T`.
 * 2. A function to update the state value of type `Dispatch<SetStateAction<T>>`.
 * 3. A function `resetState` of type `ResetState` that resets the state to its initial value.
 */
export const useResetState = <T>(
  initialState: T | (() => T)
): [T, Dispatch<SetStateAction<T>>, ResetState] => {
  const initialStateRef = useRef<T | (() => T)>(initialState)
  const [state, setState] = useState<T>(
    typeof initialState === 'function'
      ? (initialState as () => T)()
      : initialState
  )

  const resetState = useCallback(() => {
    const newState =
      typeof initialStateRef.current === 'function'
        ? (initialStateRef.current as () => T)()
        : initialStateRef.current
    setState(newState)
  }, [])

  return [state, setState, resetState]
}
