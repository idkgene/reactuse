import { useAbs } from '../useAbs';
import * as React from 'react';
 
const Component = () => {
  const value = -10;
  const absValue = useAbs(value);
 
  return (
    <div>
      <p>
        Absolute value of {value}: {absValue}
      </p>
    </div>
  );
};
 
export default Component;