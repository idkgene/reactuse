import { useClamp } from '../useClamp';
import * as React from 'react';
 
const Component = () => {
  const clamped = useClamp(5, 0, 10); // Returns `5`
  const clampedWithFn = useClamp(() => 15, 0, 10); // Returns `10`
 
  return (
    <div>
      <p>Clamped Value: {clamped}</p>
      <p>Clamped Value (Function): {clampedWithFn}</p>
    </div>
  );
};
 
export default Component;