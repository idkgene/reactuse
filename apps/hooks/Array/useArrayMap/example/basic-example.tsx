import { useArrayMap } from '../useArrayMap';
import * as React from 'react';

const Component = () => {
  const [numbers, setNumbers] = React.useState([1, 2, 3, 4]);

  const squaredNumbers = useArrayMap(numbers, number => number * number);

  return (
    <div>
      <p>Squared Numbers: {squaredNumbers.join(', ')}</p>
    </div>
  );
};

export default Component;
