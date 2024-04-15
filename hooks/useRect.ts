import { MutableRefObject, useCallback, useLayoutEffect, useState } from 'react'

/**
 * @param {MutableRefObject<HTMLElement | null>} ref - The reference to the HTML element you want to observe.
 * @returns {DOMRect | null} - The size and position of the observed element, or null if the element is not available.
 */

export const useRect = (ref: MutableRefObject<HTMLElement | null>) => {
  const [rect, setRect] = useState<DOMRect | null>(null)

  const handleResize = useCallback(() => {
    if (!ref.current) {
      setRect(null)
      return
    }

    setRect(ref.current.getBoundingClientRect())
  }, [ref])

  useLayoutEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    handleResize()

    if (typeof ResizeObserver === 'function') {
      const resizeObserver = new ResizeObserver(handleResize)

      resizeObserver.observe(element)

      return () => {
        resizeObserver.disconnect()
      }
    } else {
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [ref, handleResize])

  return rect
}
