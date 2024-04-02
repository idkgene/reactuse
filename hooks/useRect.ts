/**
 * This custom React hook, `useRect`, allows you to get the size and position of an HTML element.
 * It uses the ResizeObserver API if available, otherwise it falls back to the window resize event.
 *
 * @param {MutableRefObject<any>} ref - The reference to the HTML element you want to observe.
 * @returns {Object} - An object containing the size and position of the observed element.
 */

import { MutableRefObject, useCallback, useLayoutEffect, useState } from 'react'

export const useRect = (ref: MutableRefObject<any>) => {
  // Initialize the state with the initial size and position of the element
  const [rect, setRect] = useState(getRect(ref ? ref.current : null))

  // Function to handle the resize event
  const handleResize = useCallback(() => {
    // If the refference doesn't exist, return early
    if (!ref.current) {
      return
    }

    // Update client rect with the new size and position of the element
    setRect(getRect(ref.current))
  }, [ref])

  // Effect hook to handle the resize event
  useLayoutEffect(() => {
    const element = ref.current

    // If the refference is not available, return early
    if (!element) {
      return
    }

    // Call the handleResize function to initialize the client rect
    handleResize()

    // Check if the ResizeObserver API is available
    if (typeof ResizeObserver === 'function') {
      let resizeObserver: ResizeObserver | null = new ResizeObserver(() => handleResize())
      resizeObserver.observe(element)

      return () => {
        if (!resizeObserver) {
          return
        }

        resizeObserver.disconnect()
        resizeObserver = null
      }
    } else {
      // Browser support, remove freely
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, )

  return rect
}

function getRect(element: HTMLElement | null) {
  if (!element) {
    return {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    }
  }

  return element.getBoundingClientRect()
}
