import { useMax } from '../useMax';
import * as React from 'react';

const Component = () => {
  const value1 = 5;
  const value2 = 10;
  const value3 = 3;

  const maxValue = useMax(value1, value2, value3);

  return (
    <div>
      <p>Maximum value: {maxValue}</p>
    </div>
  );
};

export default Component;
