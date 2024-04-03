/**
 * @module useFirstMountState
 * @returns {boolean} True on the initial render, false on subsequent renders.
 */

import { useEffect, useRef } from 'react'

export function useFirstMountState(): boolean {
  const isFirst = useRef(true)

  useEffect(() => {
    isFirst.current = false
  }, []) // Empty dependency array ensures the effect runs only once

  return isFirst.current
}
