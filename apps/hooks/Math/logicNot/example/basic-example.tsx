import { logicNot } from '../logicNot';
import * as React from 'react';

const Component = () => {
  const value = true;

  const result = logicNot(value);

  return (
    <div>
      <p>Logical NOT result: {result.toString()}</p>
    </div>
  );
};

export default Component;
