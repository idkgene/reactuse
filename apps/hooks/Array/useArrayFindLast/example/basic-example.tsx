import { useArrayFindLast } from '../useArrayFindLast';
import * as React from 'react';

const Component = () => {
  const [users, setUsers] = React.useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);

  const findLastUserByName = (user: { name: string; }) => user.name.startsWith('B');

  const lastUser = useArrayFindLast(users, findLastUserByName);

  return (
    <div>
      <p>Last User: {lastUser ? lastUser.name : 'None'}</p>
    </div>
  );
};

export default Component;
