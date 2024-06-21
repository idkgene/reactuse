import { logicAnd } from '../logicAnd';
import * as React from 'react';

const Component = () => {
  const [value1, setValue1] = React.useState(true);
  const [value2, setValue2] = React.useState(true);

  const result = logicAnd(value1, value2, () => true);

  return (
    <div>
      <p>Logical AND result: {result.toString()}</p>
      <button onClick={() => setValue1(false)}>Set value1 to false</button>
      <button onClick={() => setValue2(false)}>Set value2 to false</button>
    </div>
  );
};

export default Component;
