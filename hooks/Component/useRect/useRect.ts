import { MutableRefObject, useCallback, useLayoutEffect, useState } from 'react'

interface RectResult {
  x: number
  y: number
  width: number
  height: number
  top: number
  right: number
  bottom: number
  left: number
}

type UseRectReturn = RectResult | null

export const useRect = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>
): UseRectReturn => {
  const [rect, setRect] = useState<UseRectReturn>(null)

  const handleResize = useCallback(() => {
    if (!ref.current) {
      setRect(null)
      return
    }

    const { x, y, width, height, top, right, bottom, left } =
      ref.current.getBoundingClientRect()
    setRect({ x, y, width, height, top, right, bottom, left })
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
