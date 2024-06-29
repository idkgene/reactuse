'use client';

import React from 'react';
import { useDrag, type DragOptions, type DragResult } from './useDrag'; // Update the path accordingly

const DragDemo: React.FC = () => {
  const dragOptions: DragOptions = {
    onDragStart: (_event, position) => {
      console.log('Drag started at:', position);
    },
    onDrag: (_event, position) => {
      console.log('Dragging to:', position);
    },
    onDragEnd: (_event, position) => {
      console.log('Drag ended at:', position);
    },
  };

  const { isDragging, dragRef, position }: DragResult = useDrag(dragOptions);

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
      onMouseDown={(e) => { e.preventDefault(); }}
    >
      Drag me!
    </div>
  );
};

export default DragDemo;
