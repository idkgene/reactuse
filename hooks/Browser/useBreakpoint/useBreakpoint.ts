import { useState, useEffect, useCallback } from 'react'

type UseBreakpointResult = {
  windowWidth: number
  isBreakpointCrossed: boolean
}

/**
 * @name useBreakpoint
 * @description A React hook that tracks the window width and checks if it has crossed a breakpoint.
 * 
 * @param breakpoint The breakpoint to check against.
 * @returns {UseBreakpointResult} An object containing the window width and a boolean indicating if the breakpoint has been crossed.
 * 
 * @example
 * const { windowWidth, isBreakpointCrossed } = useBreakpoint(768)
 } 
 */
export function useBreakpoint(breakpoint: number): UseBreakpointResult {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
  const [isBreakpointCrossed, setIsBreakpointCrossed] = useState<boolean>(
    window.innerWidth >= breakpoint
  )

  const handleResize = useCallback(() => {
    const newWindowWidth = window.innerWidth
    setWindowWidth(newWindowWidth)
    setIsBreakpointCrossed(newWindowWidth >= breakpoint)
  }, [breakpoint])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return { windowWidth, isBreakpointCrossed }
}
