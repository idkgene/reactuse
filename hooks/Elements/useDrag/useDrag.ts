// # todo fix the positioning of the clicked element

import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

interface Position {
  x: number
  y: number
}

interface DragOptions {
  onDragStart?: (event: MouseEvent | TouchEvent, position: Position) => void
  onDrag?: (event: MouseEvent | TouchEvent, position: Position) => void
  onDragEnd?: (event: MouseEvent | TouchEvent, position: Position) => void
}

interface DragResult {
  isDragging: boolean
  dragRef: RefObject<HTMLDivElement>
  position: Position
}

export function useDrag(options: DragOptions = {}): DragResult   {
  const { onDragStart, onDrag, onDragEnd } = options
  const dragRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (event.button !== 0) return
      setIsDragging(true)
      setPosition({ x: event.clientX, y: event.clientY })
      onDragStart?.(event, { x: event.clientX, y: event.clientY })
    },
    [onDragStart]
  )

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging) return
      setPosition({ x: event.clientX, y: event.clientY })
      onDrag?.(event, { x: event.clientX, y: event.clientY })
    },
    [isDragging, onDrag]
  )

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      if (event.button !== 0) return
      setIsDragging(false)
      onDragEnd?.(event, { x: event.clientX, y: event.clientY })
    },
    [onDragEnd]
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
    [onDragStart]
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
    [isDragging, onDrag]
  )

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      setIsDragging(false)
      onDragEnd?.(event, {
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY,
      })
    },
    [onDragEnd]
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
