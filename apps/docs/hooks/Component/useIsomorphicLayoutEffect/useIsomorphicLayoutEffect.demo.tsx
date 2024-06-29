import React from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

function UseIsomorphicLayoutEffectDemo() {
  const [count, setCount] = React.useState(0);

  useIsomorphicLayoutEffect(() => {
    console.log('Component mounted or updated');
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => { setCount(count + 1); }}>Increment</button>
    </div>
  );
}

export default UseIsomorphicLayoutEffectDemo;
