/**
 * @module useHover
 * @template T - The type of the HTML element to track hover state for.
 * @returns {[RefObject<T>, boolean]} An array containing a ref object to attach to the target element, and a boolean indicating the hover state.
 */

import { RefObject, useEffect, useRef, useState } from 'react'

export function useHover<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const [hovering, setHovering] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current

    if (!node) return

    const handleMouseEnter = () => setHovering(true)
    const handleMouseLeave = () => setHovering(false)

    // Add event listeners to the node
    node.addEventListener('mouseenter', handleMouseEnter)
    node.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter)
      node.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref])

  return [ref, hovering]
}
