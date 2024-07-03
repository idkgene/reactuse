'use client';

import { useState } from 'react';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';
import Demo from '@/components/Common/Demo/demo';
import { Button } from '@/components/Common/Button/button';

function IsomorphicLayoutEffectDemo(): JSX.Element {
  const [count, setCount] = useState(0);

  useIsomorphicLayoutEffect(() => {
    console.log(`Count changed: ${String(count)}`);
  }, [count]);

  return (
    <Demo category="Component" title="useIsomorphicLayoutEffect">
      <p>Count: {count}</p>
      <Button
        type="button"
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        Increment
      </Button>
    </Demo>
  );
}

export default IsomorphicLayoutEffectDemo;
