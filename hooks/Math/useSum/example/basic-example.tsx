import { useSum } from '../useSum';
import * as React from 'react';

const Component = () => {
  const numbers = [1, 2, 3, 4, 5];
  const sum = useSum(numbers);

  return (
    <div>
      <p>Sum: {sum}</p>
    </div>
  );
};

export default Component;
