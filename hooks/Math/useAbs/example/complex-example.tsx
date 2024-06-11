import { useAbs } from '../useAbs';
import * as React from 'react';
 
const Component = () => {
  const [value, setValue] = React.useState(-5);
 
  const absValue = useAbs(() => value);
 
  return (
    <div>
      <p>
        Absolute value of {value}: {absValue}
      </p>
      <button onClick={() => setValue(-10)}>Update value to -10</button>
    </div>
  );
};
 
export default Component;