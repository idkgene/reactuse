import React from 'react';
import { useMousePosition } from './useMousePosition';

function UseMousePositionDemo() {
  const position = useMousePosition();

  return (
    <div>
      <p>Mouse Position:</p>
      <p>X: {position.x}</p>
      <p>Y: {position.y}</p>
    </div>
  );
}

export default UseMousePositionDemo;
