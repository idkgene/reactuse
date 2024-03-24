/**
 * A React hook that returns true on the initial render and false on subsequent renders.
 *
 * @module useFirstMountState
 * @returns {boolean} True on the initial render, false on subsequent renders.
 */

import { useRef } from 'react'

export function useFirstMountState(): boolean {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false

    return true
  }

  return isFirst.current
}
