import React from 'react';
import { useCycleList } from './use-cycle-list';

function UseCycleListDemo() {
  const items = ['apple', 'banana', 'orange'];
  const { state, next, prev } = useCycleList(items);

  const handlePrevClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    prev();
  };

  const handleNextClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    next();
  };

  return (
    <div>
      <p>Current item: {state}</p>
      <button onClick={handlePrevClick}>Previous</button>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
}

export default UseCycleListDemo;
