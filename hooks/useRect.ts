/**
 * This custom React hook, `useRect`, allows you to get the size and position of an HTML element.
 * It uses the ResizeObserver API if available, otherwise it falls back to the window resize event.
 * The hook efficiently updates the size and position only when the element's size changes,
 * avoiding unnecessary re-renders
 *
 * @param {MutableRefObject<HTMLElement | null>} ref - The reference to the HTML element you want to observe.
 * @returns {DOMRect | null} - The size and position of the observed element, or null if the element is not available.
 */

import { MutableRefObject, useCallback, useLayoutEffect, useState } from 'react'

export const useRect = (ref: MutableRefObject<HTMLElement | null>) => {
  // Initialize the state with null, indicating that the element's size and position are not yet known
  const [rect, setRect] = useState<DOMRect | null>(null)

  // Memoize the callback to avoid unnecessary recreation on each render
  const handleResize = useCallback(() => {
    // If the reference doesn't exist, set the rect state to null and return early
    if (!ref.current) {
      setRect(null)
      return
    }

    // Update the rect state with the new size and position of the element
    setRect(ref.current.getBoundingClientRect())
  }, [ref])

  useLayoutEffect(() => {
    // Store the current element reference in a variable
    const element = ref.current

    // If the element is not available, return early
    if (!element) {
      return
    }

    // Call the handleResize function to initialize the rect state
    handleResize()

    // Check if the ResizeObserver API is available
    if (typeof ResizeObserver === 'function') {
      // Create a new ResizeObserver instance
      const resizeObserver = new ResizeObserver(handleResize)

      // Observe the element for size changes
      resizeObserver.observe(element)

      // Clean up the ResizeObserver on component unmount
      return () => {
        resizeObserver.disconnect()
      }
    } else {
      // Fallback to the window resize event if ResizeObserver is not available
      window.addEventListener('resize', handleResize)

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [ref, handleResize])

  return rect
}
