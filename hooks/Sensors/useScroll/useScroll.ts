import { useState, useEffect, useCallback } from 'react'

/**
 * @name useScroll
 * @description  This hook tracks the scroll events on the window object and debounces these
 * events to set the `isScrolling` state. It uses a timeout to determine when the
 * scrolling has stopped (no scroll events for a brief period), and updates the state accordingly.
 *
 * @returns {boolean} True if the user is currently scrolling, false otherwise.
 *
 * @example
 * import { useScroll } from './useScroll';
 *
 * function MyComponent() {
 *   const isScrolling = useScroll();
 *
 *   return (
 *     <div>
 *       <p>User is scrolling: {isScrolling ? 'Yes' : 'No'}</p>
 *     </div>
 *   );
 * }
 */
export const useScroll = (): boolean => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false)

  const handleScroll = useCallback(() => {
    setIsScrolling(true)
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

     /**
     * @function debounceScroll
     * @description Debounces the scroll event. Sets the `isScrolling` state to false
     * after a delay of 100 milliseconds, indicating that scrolling has stopped.
     * 
     * @private
     */
    const debounceScroll = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        setIsScrolling(false)
      }, 100)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', debounceScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', debounceScroll)
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
    }
  }, [handleScroll])

  return isScrolling
}
