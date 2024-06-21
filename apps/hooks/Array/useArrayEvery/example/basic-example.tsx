import { useArrayEvery } from '../useArrayEvery';
import * as React from 'react';

const Component = () => {
  const [list, setList] = React.useState([2, 4, 6, 8]);

  // Check if all numbers are even
  const allEven = useArrayEvery(list, num => num % 2 === 0);

  return (
    <div>
      <p>All numbers are even: {JSON.stringify(allEven)}</p>
    </div>
  );
};

export default Component;
