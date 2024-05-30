import { useState, useEffect } from 'react'

/**
 * @name useMouseWheel
 * @description This hook listens for 'wheel' events on the window object to capture the
 * vertical scroll amount (deltaY) when the user scrolls using the mouse wheel.
 * It returns the deltaY value which represents the speed and direction of the mouse wheel scroll:
 * - A positive deltaY indicates a scroll downward.
 * - A negative deltaY indicates a scroll upward. Y
 *
 * @returns {number} The deltaY value from the mouse wheel event, indicating the vertical scroll amount.
 */
export const useMouseWheel = (): number => {
  const [deltaY, setDeltaY] = useState<number>(0)

  useEffect(() => {
    /**
     * @function handleWheel
     * @description Event handler for the 'wheel' event. Updates the deltaY state
     * with the vertical scroll amount (deltaY) from the WheelEvent.
     *
     * @param {WheelEvent} event - The event object associated with the 'wheel' event.
     * @private
     */
    const handleWheel = (event: WheelEvent) => {
      setDeltaY(event.deltaY)
    }

    window.addEventListener('wheel', handleWheel)

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return deltaY
}
