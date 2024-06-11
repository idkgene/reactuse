import { useAverage } from '../useAverage';
import * as React from 'react';

const Component = () => {
  const avg = useAverage(1, 2, 3, 4); // Returns `2.5`
  const avgArray = useAverage([1, 2, 3, 4]); // Returns `2.5`

  return (
    <div>
      <p>Average: {avg}</p>
      <p>Average (Array): {avgArray}</p>
    </div>
  );
};

export default Component;
