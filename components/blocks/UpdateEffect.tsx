import { useUpdateEffect } from '@hooks/useUpdateEffect';
import { useCallback, useState } from 'react';

export default function UpdateEffectShowcase() {
  const [count, setCount] = useState(0);

  const handleUpdateEffect = useCallback(() => {
    console.log('Effect triggered');
  }, []);
  
  useUpdateEffect(handleUpdateEffect, [count]);

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useUpdateEffect"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useUpdateEffect
        </h2>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <p>Count {count}</p>
      </div>
    </>
  )
}
