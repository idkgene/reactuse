// # todo fix the positioning of the clicked element

import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

interface DragOptions {
  onDragStart?: (
    event: MouseEvent | TouchEvent,
    position: { x: number; y: number },
  ) => void
  onDrag?: (
    event: MouseEvent | TouchEvent,
    position: { x: number; y: number },
  ) => void
  onDragEnd?: (
    event: MouseEvent | TouchEvent,
    position: { x: number; y: number },
  ) => void
}

interface DragResult {
  isDragging: boolean
  dragRef: RefObject<HTMLDivElement>
  position: { x: number; y: number }
}

/**
 * @param {DragOptions} options - An object containing options for the useDrag hook.
 * @param {onDragStart} options.onDragStart - A callback function that is called when the user starts dragging.
 * @param {onDrag} options.onDrag - A callback function that is called while the user is dragging.
 * @param {onDragEnd} options.onDragEnd - A callback function that is called when the user stops dragging.
 * @returns {DragResult} An object containing the following properties:
 * - `isDragging`: A boolean indicating whether the user is currently dragging.
 * - `dragRef`: A reference to the HTML element that is being dragged.
 * - `position`: An object containing the current position of the dragged element.
 * - `handleMouseDown`: A function that is called when the user starts dragging.
 * - `handleMouseMove`: A function that is called while the user is dragging.
 * - `handleMouseUp`: A function that is called when the user stops dragging.
 * - `handleTouchStart`: A function that is called when the user starts dragging using a touch device.
 * - `handleTouchMove`: A function that is called while the user is dragging using a touch device.
 * - `handleTouchEnd`: A function that is called when the user stops dragging using a touch device.
 * - `handleMouseLeave`: A function that is called when the user leaves the dragged element.
 * - `handleMouseEnter`: A function that is called when the user enters the dragged element.
 */

export function useDrag(options: DragOptions = {}): DragResult {
  const { onDragStart, onDrag, onDragEnd } = options
  const dragRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (event.button !== 0) return // Left mouse button is 0
      setIsDragging(true)
      setPosition({ x: event.clientX, y: event.clientY })
      onDragStart?.(event, { x: event.clientX, y: event.clientY })
    },
    [onDragStart],
  )

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging) return
      setPosition({ x: event.clientX, y: event.clientY })
      onDrag?.(event, { x: event.clientX, y: event.clientY })
    },
    [isDragging, onDrag],
  )

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      if (event.button !== 0) return
      setIsDragging(false)
      onDragEnd?.(event, { x: event.clientX, y: event.clientY })
    },
    [onDragEnd],
  )

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      setIsDragging(true)
      setPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY })
      onDragStart?.(event, {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      })
    },
    [onDragStart],
  )

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (!isDragging) return
      setPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY })
      onDrag?.(event, {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      })
    },
    [isDragging, onDrag],
  )

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      setIsDragging(false)
      onDragEnd?.(event, {
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY,
      })
    },
    [onDragEnd],
  )

  useEffect(() => {
    const element = dragRef.current
    if (element) {
      element.addEventListener('mousedown', handleMouseDown)
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      window.addEventListener('mouseup', handleMouseUp)

      element.addEventListener('touchstart', handleTouchStart)
      window.addEventListener('touchmove', handleTouchMove, { passive: true })
      window.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      if (element) {
        element.removeEventListener('mousedown', handleMouseDown)
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)

        element.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  ])

  return {
    isDragging,
    dragRef,
    position,
  }
}
