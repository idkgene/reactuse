import { useArrayIncludes } from '../useArrayIncludes';
import * as React from 'react';

const Component = () => {
  const [numbers, setNumbers] = React.useState([1, 2, 3, 4, 5]);

  const includesNumber = useArrayIncludes(numbers, 3);

  return (
    <div>
      <p>Includes number 3: {includesNumber ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Component;