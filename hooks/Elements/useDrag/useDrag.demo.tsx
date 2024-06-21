'use client';

import React from 'react';
import { useDrag, DragOptions, DragResult, Position } from './useDrag'; // Update the path accordingly

// Create a component to demonstrate the drag functionality
const DragDemo: React.FC = () => {
  // Define the drag options
  const dragOptions: DragOptions = {
    onDragStart: (event, position) => {
      console.log('Drag started at:', position);
    },
    onDrag: (event, position) => {
      console.log('Dragging to:', position);
    },
    onDragEnd: (event, position) => {
      console.log('Drag ended at:', position);
    },
  };

  // Use the useDrag hook
  const { isDragging, dragRef, position }: DragResult = useDrag(dragOptions);

  // Define styles for the draggable element
  const draggableStyle: React.CSSProperties = {
    position: 'absolute',
    top: position.y,
    left: position.x,
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
  };

  return (
    <div
      ref={dragRef}
      style={draggableStyle}
      onMouseDown={(e) => e.preventDefault()} // Prevent default mouse behavior
    >
      Drag me!
    </div>
  );
};

export default DragDemo;
