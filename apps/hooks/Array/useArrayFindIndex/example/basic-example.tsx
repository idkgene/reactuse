import { useArrayFindIndex } from '../useArrayFindIndex';
import * as React from 'react';

const Component = () => {
  const [users, setUsers] = React.useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);

  const findUserIndexById = (user: { id: number }) => user.id === 2;

  const userIndex = useArrayFindIndex(users, findUserIndexById);

  return (
    <div>
      <p>User Index: {userIndex}</p>
    </div>
  );
};

export default Component;
