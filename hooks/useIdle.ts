/**
 * A React hook that detects user inactivity and sets an idle state after a specified amount of time.
 *
 * @module useIdle
 * @param {number} [ms=60000] - The amount of time in milliseconds after which the user is considered idle.
 * @returns {boolean} A boolean indicating whether the user is currently idle.
 *
 * @description
 * The `useIdle` hook monitors various user events such as mouse movements, mouse clicks, keyboard input, window resizing,
 * touch events, and scroll events. If no user activity is detected within the specified time (default is 1 minute),
 * the hook sets an idle state to true. The idle state is reset to false whenever user activity is detected.
 *
 * The hook also takes into account the browser's visibility state. If the browser tab or window becomes visible again,
 * the idle state is reset to false.
 *
 * The hook uses a throttling utility function to prevent excessive event handling and improve performance.
 *
 * @example
 * import { useIdle } from './useIdle';
 *
 * function MyComponent() {
 *   const isIdle = useIdle(1000 * 60 * 5); // User is considered idle after 5 minutes
 *
 *   return (
 *     <div>
 *       {isIdle ? 'User is idle' : 'User is active'}
 *     </div>
 *   );
 * }
 */

import { RefObject, useEffect, useRef, useState } from 'react'

export function useHover<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const [hovering, setHovering] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    // Get the current node from the ref
    const node = ref.current

    // If the node doesn't exist, return early
    if (!node) return

    // Define the event handler functions
    const handleMouseEnter = () => setHovering(true)
    const handleMouseLeave = () => setHovering(false)

    // Add event listeners to the node
    node.addEventListener('mouseenter', handleMouseEnter)
    node.addEventListener('mouseleave', handleMouseLeave)

    // Clean up the event listeners when the component unmounts or the ref changes
    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter)
      node.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref])

  return [ref, hovering]
}
