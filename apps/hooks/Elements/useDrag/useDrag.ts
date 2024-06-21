import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

export interface Position {
  x: number;
  y: number;
}

export interface DragOptions {
  onDragStart?: (event: MouseEvent | TouchEvent, position: Position) => void;
  onDrag?: (event: MouseEvent | TouchEvent, position: Position) => void;
  onDragEnd?: (event: MouseEvent | TouchEvent, position: Position) => void;
}

export interface DragResult {
  isDragging: boolean;
  dragRef: RefObject<HTMLDivElement>;
  position: Position;
}

export function useDrag(options: DragOptions = {}): DragResult {
  const { onDragStart, onDrag, onDragEnd } = options;
  const dragRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const startPositionRef = useRef<Position>({ x: 0, y: 0 });
  const offsetRef = useRef<Position>({ x: 0, y: 0 });

  const handleStart = useCallback(
    (clientX: number, clientY: number, event: MouseEvent | TouchEvent) => {
      if (!dragRef.current) return;

      const rect = dragRef.current.getBoundingClientRect();
      startPositionRef.current = { x: clientX, y: clientY };
      offsetRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
      setIsDragging(true);
      onDragStart?.(event, { x: clientX, y: clientY });
    },
    [onDragStart],
  );

  const handleMove = useCallback(
    (clientX: number, clientY: number, event: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      const newPosition = {
        x: clientX - offsetRef.current.x,
        y: clientY - offsetRef.current.y,
      };
      setPosition(newPosition);
      onDrag?.(event, newPosition);
    },
    [isDragging, onDrag],
  );

  const handleEnd = useCallback(
    (clientX: number, clientY: number, event: MouseEvent | TouchEvent) => {
      setIsDragging(false);
      onDragEnd?.(event, { x: clientX, y: clientY });
    },
    [onDragEnd],
  );

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (event.button !== 0) return;
      handleStart(event.clientX, event.clientY, event);
    },
    [handleStart],
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      handleMove(event.clientX, event.clientY, event);
    },
    [handleMove],
  );

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      if (event.button !== 0) return;
      handleEnd(event.clientX, event.clientY, event);
    },
    [handleEnd],
  );

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      const touch = event.touches[0];
      handleStart(touch.clientX, touch.clientY, event);
    },
    [handleStart],
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      const touch = event.touches[0];
      handleMove(touch.clientX, touch.clientY, event);
    },
    [handleMove],
  );

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      handleEnd(touch.clientX, touch.clientY, event);
    },
    [handleEnd],
  );

  useEffect(() => {
    const element = dragRef.current;
    if (element) {
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('touchstart', handleTouchStart, {
        passive: false,
      });

      return () => {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('touchstart', handleTouchStart);
      };
    }
  }, [handleMouseDown, handleTouchStart]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  return {
    isDragging,
    dragRef,
    position,
  };
}
