import { useArrayDifference } from '../useArrayDifference';
import * as React from 'react';

const Component = () => {
  const [list1, setList1] = React.useState([{ id: 1 }, { id: 2 }, { id: 3 }]);
  const [list2, setList2] = React.useState([{ id: 2 }, { id: 4 }]);

  // Custom comparison function based on the 'id' property
  const difference = useArrayDifference(list1, list2, (a, b) => a.id === b.id);

  return (
    <div>
      <p>Difference: {JSON.stringify(difference)}</p>
    </div>
  );
};

export default Component;
