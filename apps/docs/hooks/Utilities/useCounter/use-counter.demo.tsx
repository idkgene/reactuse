import React from 'react';
import { useCounter } from './use-counter';

function UseCounterDemo(): JSX.Element {
  const { count, inc, dec, reset } = useCounter(0, { min: 0, max: 10 });

  return (
    <div>
      <h1>Count: {count}</h1>
      <button
        type="button"
        onClick={() => {
          inc();
        }}
      >
        Increment
      </button>
      <button
        type="button"
        onClick={() => {
          dec();
        }}
      >
        Decrement
      </button>
      <button
        type="button"
        onClick={() => {
          reset();
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default UseCounterDemo;
