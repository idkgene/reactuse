import { useArrayReduce } from '../useArrayReduce';
import * as React from 'react';

const Component = () => {
  const [objects, setObjects] = React.useState([{ count: 1 }, { count: 2 }]);

  const totalCount = useArrayReduce(
    objects,
    (accumulator, obj) => accumulator + obj.count,
    0
  );

  return (
    <div>
      <p>Total Count: {totalCount}</p>
    </div>
  );
};

export default Component;