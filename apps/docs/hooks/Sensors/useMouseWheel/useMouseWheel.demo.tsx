import React from 'react';
import { useMouseWheel } from './useMouseWheel';

function UseMouseWheelDemo() {
  const deltaY = useMouseWheel();

  return (
    <div>
      <p>Mouse wheel delta Y: {deltaY}</p>
    </div>
  );
}

export default UseMouseWheelDemo;
