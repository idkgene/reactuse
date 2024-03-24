/**
 * A React hook that runs an effect function only once, on the initial render.
 *
 * @module useEffectOnce
 * @param {() => void | (() => void)} effect - The effect function to be executed once.
 * @returns {void}
 */

import { useEffect, useRef, useState } from "react";

export const useEffectOnce = (effect: () => void | (() => void)) => {
  // Ref to store the effect fn
  const effectFn = useRef<() => void | (() => void)>(effect)
  // Ref to store the destroy fn returned by effect
  const destroyFn = useRef<void | (() => void)>()
  // Ref to store if the effect has been called
  const effectCalled = useRef(false)
  // Ref to store if the effect has been rendered
  const rendered = useRef(false)
  // State to force a re-render
  const [, setVal] = useState<number>(0)

  // Update the rendered ref if the effect has been called
  if (effectCalled.current) {
    rendered.current = true
  }

  useEffect(() => {
    // Only run the effect if it hasn't been called yet
    if (!effectCalled.current) {
      destroyFn.current = effectFn.current()
      effectCalled.current = true
    }

    // Force a re-render to ensure the effect is cleaned up on unmount
    setVal((val) => val + 1)

    // Clean up the effect on component unmount
    return () => {
      if (!rendered.current) {
        return
      }

      if (destroyFn.current) {
        destroyFn.current()
      }
    }
  }, [])
}
