import { useArrayDifference } from '../useArrayDifference';
import * as React from 'react';

const Component = () => {
  const [list1, setList1] = React.useState([
    { name: 'Alice' },
    { name: 'Bob' },
  ]);
  const [list2, setList2] = React.useState([
    { name: 'Bob' },
    { name: 'Charlie' },
  ]);

  // Compare based on the 'name' property
  const difference = useArrayDifference(list1, list2, 'name');

  return (
    <div>
      <p>
        Difference showing elements from list1 that are not present in list2:{' '}
        {JSON.stringify(difference)}
      </p>
    </div>
  );
};

export default Component;
