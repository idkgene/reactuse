import { useSorted } from '../useSorted';
import * as React from 'react';

const Component = () => {
  const [list, setList] = React.useState([5, 3, 1, 4, 2]);

  // Using a comparison function
  const sortedList = useSorted(list, (a, b) => a - b);

  return <div>Sorted List: {JSON.stringify(sortedList)}</div>;
};

export default Component;
