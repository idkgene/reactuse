import { RefObject, useEffect, useRef, useState } from 'react'

export function useHover<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const [hovering, setHovering] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current

    if (!node) return

    const handleMouseEnter = () => {
      setHovering(true)
    }

    const handleMouseLeave = () => {
      setHovering(false)
    }

    node.addEventListener('mouseenter', handleMouseEnter)
    node.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter)
      node.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return [ref, hovering]
}
