import { logicNot } from '../logicNot';
import * as React from 'react';

const Component = () => {
  const [value, setValue] = React.useState(false);

  const result = logicNot(() => value);

  return (
    <div>
      <p>Logical NOT result: {result.toString()}</p>
      <button onClick={() => setValue(true)}>Set value to true</button>
    </div>
  );
};

export default Component;
