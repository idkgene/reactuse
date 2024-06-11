import { useMin } from '../useMin';
import * as React from 'react';

const Component = () => {
  const value1 = 5;
  const value2 = 10;
  const value3 = 3;

  const minValue = useMin(value1, value2, value3);

  return (
    <div>
      <p>Minimum value: {minValue}</p>
    </div>
  );
};

export default Component;
