import { logicOr } from '../logicOr';
import * as React from 'react';
 
const Component = () => {
  const value1 = true;
  const value2 = false;
  const value3 = () => false;
 
  const result = logicOr(value1, value2, value3);
 
  return (
    <div>
      <p>Logical OR result: {result.toString()}</p>
    </div>
  );
};
 
export default Component;