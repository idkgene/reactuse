import { useArrayDifference } from '../useArrayDifference';
import * as React from 'react';

const Component = () => {
  const [list1, setList1] = React.useState([0, 1, 2, 3, 4, 5]);
  const [list2, setList2] = React.useState([4, 5, 6]);

  const difference = useArrayDifference(list1, list2);

  return (
    <div>
      <p>Difference: {JSON.stringify(difference)}</p>
    </div>
  );
};

export default Component;
