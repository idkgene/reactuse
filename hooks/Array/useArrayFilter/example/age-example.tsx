import { useArrayFilter } from '../useArrayFilter';
import * as React from 'react';

const Component = () => {
  const [users, setUsers] = React.useState([
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
  ]);

  const isAdult = (user: { age: number }) => user.age >= 18;

  const adults = useArrayFilter(users, isAdult);

  return (
    <ul>
      {adults.map(user => (
        <li key={user.name}>{user.name}</li>
      ))}
    </ul>
  );
};

export default Component;
