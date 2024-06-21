import { usePrecision } from '../usePrecision';
import * as React from 'react';

const Component = () => {
  const [value, setValue] = React.useState(1.23456);
  const [precision, setPrecision] = React.useState(3);

  const formattedValue = usePrecision({ precision, value });

  return (
    <div>
      <p>Original value: {value}</p>
      <p>Formatted value: {formattedValue}</p>
      <button onClick={() => setValue(4.56789)}>Update value</button>
      <button onClick={() => setPrecision(1)}>Update precision</button>
    </div>
  );
};

export default Component;
