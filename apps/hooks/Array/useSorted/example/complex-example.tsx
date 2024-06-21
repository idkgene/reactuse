import { useSorted } from '../useSorted';
import * as React from 'react';

const Component = () => {
  const [list, setList] = React.useState([
    { id: 3, name: 'Charlie' },
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]);

  // Using sorting options
  const sortedList = useSorted(list, {
    compareFn: (a, b) => a.id - b.id,
    dirty: true, // Mutates the input array
  });

  return <div>Sorted List: {JSON.stringify(sortedList)}</div>;
};

export default Component;
