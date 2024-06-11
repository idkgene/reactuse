import { useSum } from '../useSum';
import * as React from 'react';

const Component = () => {
  const [numbers, setNumbers] = React.useState([10, 20, 30]);
  const sum = useSum(numbers);

  const handleAddNumber = () => {
    setNumbers([...numbers, 40]);
  };

  return (
    <div>
      <p>Sum: {sum}</p>
      <button onClick={handleAddNumber}>Add Number</button>
    </div>
  );
};

export default Component;
