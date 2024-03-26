import { RefObject, useEffect, useRef, useState } from 'react';

interface DragOptions {
  onDragStart?: (event: MouseEvent | TouchEvent) => void;
  onDrag?: (event: MouseEvent | TouchEvent) => void;
  onDragEnd?: (event: MouseEvent | TouchEvent) => void;
}

interface DragResult {
  isDragging: boolean;
  dragRef: RefObject<HTMLDivElement>;
}

export function useDrag(options: DragOptions = {}): DragResult {
  const { onDragStart, onDrag, onDragEnd } = options;
  const dragRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      setIsDragging(true);
      onDragStart?.(event);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;
      onDrag?.(event);
    };

    const handleMouseUp = (event: MouseEvent) => {
      setIsDragging(false);
      onDragEnd?.(event);
    };

    const handleTouchStart = (event: TouchEvent) => {
      setIsDragging(true);
      onDragStart?.(event);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isDragging) return;
      onDrag?.(event);
    };

    const handleTouchEnd = (event: TouchEvent) => {
      setIsDragging(false);
      onDragEnd?.(event);
    };

    const element = dragRef.current;
    if (element) {
      element.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      element.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);

        element.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isDragging, onDragStart, onDrag, onDragEnd]);

  return {
    isDragging,
    dragRef,
  };
}