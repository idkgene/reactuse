import { useEffect, useState } from 'react'

/**
 * @name useMousePosition
 * @description This hook listens for 'mousemove' events on the window object to capture and update
 * the current mouse position. It returns an object containing the x and y coordinates
 * of the mouse cursor relative to the viewport.
 *
 * @returns {{x: number, y: number}} An object containing the x and y coordinates of the mouse position.
 *
 *  * @example
 * import { useMousePosition } from './useMousePosition';
 *
 * function Component() {
 *   const { x, y } = useMousePosition();
 *
 *   return (
 *     <div>
 *       <p>Mouse position - X: {x}, Y: {y}</p>
 *     </div>
 *   );
 * }
 */
export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  /**
   * @function handleMouseMove
   * @description Event handler for the 'mousemove' event. Updates the position state
   * with the current mouse coordinates.
   *
   * @param {MouseEvent} event - The event object associated with the 'mousemove' event.
   * @private
   */
  const handleMouseMove = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return position
}
