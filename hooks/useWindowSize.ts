import { useState } from 'react'
import { useEventListener } from './useEventListener'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export interface WindowSize {
  width: number
  height: number
}

/**
 * Custom hook that returns the current size of the window.
 * @returns {WindowSize} The current window size.
 */
export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEventListener('resize', handleSize)

  useIsomorphicLayoutEffect(() => {
    handleSize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return windowSize
}
