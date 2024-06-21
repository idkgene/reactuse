import { useFloor } from '../useFloor';
import * as React from 'react';

const Component = () => {
  const floored = useFloor(4.9); // Returns `4`
  const flooredWithFn = useFloor(() => 7.8); // Returns `7`

  return (
    <div>
      <p>Floored Value: {floored}</p>
      <p>Floored Value (Function): {flooredWithFn}</p>
    </div>
  );
};

export default Component;
