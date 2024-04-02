import { useEffect, useRef } from 'react'
import { useFirstMountState } from './useFirstMountState'

/**
 * A custom React hook that runs an effect function only when the component updates, after the initial render.
 *
 * @param {() => void | (() => void)} effect - The effect function to be executed after the initial render.
 * @param {readonly any[]} [deps=[]] - An optional array of dependencies for the effect function.
 */

export const useUpdateEffect: typeof useEffect = (effect, deps = []) => {
  // Ref to store whether it's the first render or not
  const isFirstMount = useRef(true)

  useEffect(() => {
    // If it's not the first render, execute the effect function
    if (!isFirstMount.current) {
      return effect()
    }
    // Set the ref to false after the first render
    isFirstMount.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect, ...deps]) // Include effect and deps in the dependency array
}
