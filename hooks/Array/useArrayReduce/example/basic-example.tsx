import { useArrayReduce } from '../useArrayReduce';
import * as React from 'react';

const Component = () => {
  const [numbers, setNumbers] = React.useState([1, 2, 3, 4]);

  const sum = useArrayReduce(
    numbers,
    (accumulator, number) => accumulator + number,
    0
  );

  return (
    <div>
      <p>Sum: {sum}</p>
    </div>
  );
};

export default Component;