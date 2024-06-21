import { logicAnd } from '../logicAnd';
import * as React from 'react';

const Component = () => {
  const value1 = true;
  const value2 = false;
  const value3 = () => true;

  const result = logicAnd(value1, value2, value3);

  return (
    <div>
      <p>Logical AND result: {result.toString()}</p>
    </div>
  );
};

export default Component;
