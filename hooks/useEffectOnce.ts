/**
 * A React hook that runs an effect function only once, on the initial render.
 *
 * @module useEffectOnce
 * @param {() => void | (() => void)} effect - The effect function to be executed once.
 * @returns {void}
 */

import { useEffect, useRef } from 'react'

export const useEffectOnce = (effect: () => void | (() => void)) => {
  // Ref to store if the effect has been called
  const effectCalled = useRef(false)

  useEffect(() => {
    // Only run the effect if it hasn't been called yet
    if (!effectCalled.current) {
      // Call the effect function
      const destroyFn = effect()

      // Mark the effect as called
      effectCalled.current = true

      // Clean up the effect on component unmount if a destroy function is returned
      return () => {
        if (destroyFn && typeof destroyFn === 'function') {
          destroyFn()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array ensures the effect runs only once
}
