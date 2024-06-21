import { useArrayFind } from '../useArrayFind';
import * as React from 'react';

const Component = () => {
  const [users, setUsers] = React.useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);

  const findUserById = (user: { id: number }) => user.id === 2;

  const user = useArrayFind(users, findUserById);

  return (
    <div>
      <p>User: {user ? user.name : 'None'}</p>
    </div>
  );
};

export default Component;
