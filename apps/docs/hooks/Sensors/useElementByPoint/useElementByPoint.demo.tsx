import React, { useRef } from 'react';
import { useElementByPoint } from './useElementByPoint';

function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { element } = useElementByPoint({ x: 100, y: 100 });

  return (
    <div ref={containerRef} style={{ height: '500px', width: '500px' }}>
      <p>Click anywhere in the container to see the element at (100, 100)</p>
      {element ? <p>
          Element at (100, 100):{' '}
          {Array.isArray(element)
            ? element.map((el) => el.tagName).join(', ')
            : element.tagName}
        </p> : null}{' '}
    </div>
  );
}

export default Demo;
