import { useCallback, useEffect, useState } from 'react'

type WindowSize = {
  innerWidth: number
  innerHeight: number
  outerWidth: number
  outerHeight: number
}

/**
 * Custom React hook that tracks and returns the window's inner and outer dimensions on resize.
 * @returns An object containing the current window size information.
 */
const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0,
  })

  // Memoized callback function to handle the window resize event
  const handleResize = useCallback(() => {
    setWindowSize({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
    })
  }, [])

  // Effect to set up the event listener and clean up on unmount
  useEffect(() => {
    // Check if the window object is available (browser environment)
    if (typeof window !== 'undefined') {
      setWindowSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
      })

      // Attach the resize event listener
      window.addEventListener('resize', handleResize)

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [handleResize])

  // Return the current window size
  return windowSize
}

export default useWindowResize
