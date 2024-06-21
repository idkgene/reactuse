import { whenever } from '../whenever';
import * as React from 'react';

const Component = () => {
  const [count, setCount] = React.useState(0);

  whenever(count, (current, previous) => {
    console.log('Count changed:', current, 'Previous:', previous);
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Component;
