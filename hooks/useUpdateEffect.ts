import { useEffect, useRef } from 'react'

/**
 * @param {() => void | (() => void)} effect - The effect function to be executed after the initial render.
 * @param {readonly any[]} [deps=[]] - An optional array of dependencies for the effect function.
 */

export const useUpdateEffect: typeof useEffect = (effect, deps = []) => {
  const isFirstMount = useRef(true)

  useEffect(() => {
    if (!isFirstMount.current) {
      return effect()
    }
    isFirstMount.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect, ...deps]) // Include effect and deps in the dependency array
}
