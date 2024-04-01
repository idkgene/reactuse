/**
 * A React hook that provides a ref and a boolean state indicating whether the referenced element is being hovered over.
 *
 * @module useHover
 * @template T - The type of the HTML element to track hover state for.
 * @returns {[RefObject<T>, boolean]} An array containing a ref object to attach to the target element, and a boolean indicating the hover state.
 *
 * @example
 * const [hoverRef, isHovered] = useHover<HTMLDivElement>();
 *
 * return (
 *   <div ref={hoverRef}>
 *     {isHovered ? 'Hovered' : 'Not hovered'}
 *   </div>
 * );
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
