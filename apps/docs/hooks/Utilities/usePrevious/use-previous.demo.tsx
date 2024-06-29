import React, { useState } from 'react';
import { usePrevious } from './use-previous';

const UsePreviousDemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current count: {count}</p>
      <p>Previous count: {prevCount}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
};

export default UsePreviousDemo;
