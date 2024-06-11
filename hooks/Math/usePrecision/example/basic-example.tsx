import { usePrecision } from '../usePrecision';
import * as React from 'react';

const Component = () => {
  const value = 3.14159;
  const precision = 2;

  const formattedValue = usePrecision({ precision, value });

  return (
    <div>
      <p>Original value: {value}</p>
      <p>Formatted value: {formattedValue}</p>
    </div>
  );
};

export default Component;
