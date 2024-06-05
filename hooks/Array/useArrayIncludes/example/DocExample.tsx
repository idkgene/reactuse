import React from 'react';
import { useArrayIncludes } from '../useArrayIncludes';

const ExampleDemo = () => {
  const numbers = [1, 2, 3, 4, 5];
  const includesThreeFromIndex2 = useArrayIncludes(numbers, 3, {
    fromIndex: 2,
  });

  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' },
  ];
  const includesJane = useArrayIncludes(users, 'Jane', { comparator: 'name' });
  const includesUser = useArrayIncludes(
    users,
    { id: 2, name: 'Jane' },
    {
      comparator: (user, value) =>
        user.id === value.id && user.name === value.name,
    }
  );

  return (
    <div>
      <h2>Example 1: Use with additional options</h2>
      <p>Numbers array: {numbers.join(', ')}</p>
      <p>Includes 3 from index 2: {includesThreeFromIndex2.toString()}</p>

      <h2>Example 2: Use with additional options</h2>
      <p>Users array: {JSON.stringify(users)}</p>
      <p>Includes 'Jane' by name: {includesJane.toString()}</p>
      <p>
        Includes user with id: 2 and name: 'Jane': {includesUser.toString()}
      </p>
    </div>
  );
};

export default ExampleDemo;
