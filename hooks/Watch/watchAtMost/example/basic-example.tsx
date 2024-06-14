import { watchAtMost } from '../watchAtMost';
import * as React from 'react';

const Component = () => {
  const [count, setCount] = React.useState(0);

  const { stop, count: triggerCount } = watchAtMost(
    count,
    value => {
      console.log(`Value changed to ${value}`);
    },
    { count: 3 }
  );

  return (
    <div>
      <p>Count: {count}</p>
      <p>Trigger Count: {triggerCount}</p>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
      <button onClick={stop}>Stop Watching</button>
    </div>
  );
};

export default Component;
