import { get } from '../get';
import * as React from 'react';

const Component = () => {
  const ref = React.useRef({ name: 'John', age: 25 });

  const value = get(ref);
  const name = get(ref, 'name');
  const age = get(ref, 'age');

  return (
    <div>
      <p>Value: {JSON.stringify(value)}</p>
      <p>Name: {name?.toString()}</p>
      <p>Age: {age?.toString()}</p>
    </div>
  );
};

export default Component;
