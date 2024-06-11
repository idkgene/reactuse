import { useArrayFilter } from '../useArrayFilter';
import * as React from 'react';

const Component = () => {
  const [numbers, setNumbers] = React.useState([1, 2, 3, 4, 5]);
  const isEven = (number: number) => number % 2 === 0;

  const evenNumbers = useArrayFilter(numbers, isEven);

  return (
    <div>
      <p>Even Numbers: {evenNumbers.join(', ')}</p>
    </div>
  );
};

export default Component;
