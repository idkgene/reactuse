import { useArrayMap } from '../useArrayMap';
import * as React from 'react';

const Component = () => {
  const [users, setUsers] = React.useState([
    { name: 'Alice' },
    { name: 'Bob' },
  ]);

  const userNames = useArrayMap(users, user => user.name);

  return (
    <div>
      <p>User Names: {userNames.join(', ')}</p>
    </div>
  );
};

export default Component;
