
import { useEffect, useRef } from 'react'

/**
 * @module useEffectOnce
 * @param {() => void | (() => void)} effect - The effect function to be executed once.
 * @returns {void}
 */

export const useEffectOnce = (effect: () => void | (() => void)) => {
  const effectCalled = useRef(false)

  useEffect(() => {
    if (!effectCalled.current) {
      const destroyFn = effect()

      effectCalled.current = true

      return () => {
        if (destroyFn && typeof destroyFn === 'function') {
          destroyFn()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array ensures the effect runs only once
}
