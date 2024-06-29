import React, { useRef } from 'react';
import { useHover } from './useHover';

function UseHoverDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useHover(ref);

  return (
    <div
      ref={ref}
      style={{
        width: 200,
        height: 200,
        backgroundColor: isHovered ? 'red' : 'blue',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Hover me!
    </div>
  );
}

export default UseHoverDemo;
