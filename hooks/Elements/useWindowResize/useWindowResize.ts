import { useCallback, useEffect, useState } from 'react'

type WindowSize = {
  innerWidth: number
  innerHeight: number
  outerWidth: number
  outerHeight: number
}

export function useWindowResize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
  })

  const handleResize = useCallback(() => {
    setWindowSize({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
    })
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return windowSize
}
