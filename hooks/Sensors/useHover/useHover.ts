import { RefObject, useEffect, useState } from 'react'

interface UseHoverOptions {
  onHoverChange?: (isHovering: boolean) => void
  shouldHandleHover?: (isHovering: boolean, event: MouseEvent) => boolean
}

/**
 * @name useHover
 * @description A React hook that tracks the hover state of an HTML element.
 *
 * @param ref - A ref object referring to the HTML element to track.
 * @param options - Options for customizing the hook behavior.
 * @returns The current hover state of the element.
 */
export function useHover<T extends HTMLElement>(
  ref: RefObject<T>,
  options: UseHoverOptions   = {}
): boolean {
  const { onHoverChange, shouldHandleHover } = options
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) return

    const handleMouseEnter = (event: MouseEvent) => {
      const shouldHandle = shouldHandleHover?.(true, event) ?? true

      if (shouldHandle) {
        setHovering(true)
        onHoverChange?.(true)
      }
    }

    const handleMouseLeave = (event: MouseEvent) => {
      const shouldHandle = shouldHandleHover?.(false, event) ?? true

      if (shouldHandle) {
        setHovering(false)
        onHoverChange?.(false)
      }
    }

    // Add event listeners to the node
    node.addEventListener('mouseenter', handleMouseEnter)
    node.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter)
      node.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref, onHoverChange, shouldHandleHover])

  return hovering
}
