import { useState, useEffect, useCallback } from 'react'

type UseBreakpointResult = {
  windowWidth: number
  isBreakpointCrossed: boolean
}

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
