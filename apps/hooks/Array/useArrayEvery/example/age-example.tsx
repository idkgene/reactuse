import { useArrayEvery } from '../useArrayEvery';
import * as React from 'react';

const Component = () => {
  const [list, setList] = React.useState([
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 35 },
  ]);

  // Check if all people are at least 18 years old
  const allAdults = useArrayEvery(list, person => person.age >= 18);

  return (
    <div>
      <p>All people are adults: {JSON.stringify(allAdults)}</p>
    </div>
  );
};

export default Component;
