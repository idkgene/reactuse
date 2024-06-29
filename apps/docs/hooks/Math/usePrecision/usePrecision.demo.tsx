import * as React from 'react';
import { usePrecision } from './usePrecision';

function UsePrecisionDemo() {
  const [value, setValue] = React.useState(3.14159265);
  const [precision, setPrecision] = React.useState(2);
  const formattedValue = usePrecision({ precision, value });

  return (
    <div>
      <label>
        Value:
        <input
          type="number"
          value={value}
          onChange={(e) => { setValue(parseFloat(e.target.value)); }}
        />
      </label>
      <label>
        Precision:
        <input
          type="number"
          value={precision}
          onChange={(e) => { setPrecision(parseInt(e.target.value, 10)); }}
        />
      </label>
      <p>Formatted Value: {formattedValue}</p>
    </div>
  );
}

export default UsePrecisionDemo;
