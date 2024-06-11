import { useArraySome } from '../useArraySome';
import * as React from 'react';

const Component = () => {
  const [numbers, setNumbers] = React.useState([1, 2, 3, 4, 5]);

  const hasEvenNumber = useArraySome(numbers, number => number % 2 === 0);

  return (
    <div>
      <p>
        Does the array contain an even number? {hasEvenNumber ? 'Yes' : 'No'}
      </p>
    </div>
  );
};

export default Component;
