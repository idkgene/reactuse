import { logicOr } from '../logicOr';
import * as React from 'react';

const Component = () => {
  const [value1, setValue1] = React.useState(false);
  const [value2, setValue2] = React.useState(false);

  const result = logicOr(value1, value2, () => true);

  return (
    <div>
      <p>Logical OR result: {result.toString()}</p>
      <button onClick={() => setValue1(true)}>Set value1 to true</button>
      <button onClick={() => setValue2(true)}>Set value2 to true</button>
    </div>
  );
};

export default Component;
