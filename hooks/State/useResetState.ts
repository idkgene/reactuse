import { useState, useCallback, useRef } from 'react'
import type { Dispatch, SetStateAction } from 'react'

type ResetState = () => void

/**
 * Allows for managing state with a reset function in React components. * 
 * 
 * @param {T | (() => T)} initialState - The `initialState` parameter in the `useResetState` custom
 * hook is the initial state value that will be used when the component using this hook is first
 * rendered. Can be either a value of type `T` or a function that returns a value of type `T`.
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
