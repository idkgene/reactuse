import { useCeil } from '../useCeil';
import * as React from 'react';

const Component = () => {
  const ceilValue = useCeil(4.2); // Returns `5`
  const ceilValueFromFn = useCeil(() => 4.7); // Returns `5`

  return (
    <div>
      <p>Ceiling Value: {ceilValue}</p>
      <p>Ceiling Value (Function): {ceilValueFromFn}</p>
    </div>
  );
};

export default Component;
