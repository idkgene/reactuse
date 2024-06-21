import { useArraySome } from '../useArraySome';
import * as React from 'react';

const Component = () => {
  const [users, setUsers] = React.useState([
    { id: 1, isAdmin: false },
    { id: 2, isAdmin: true },
  ]);

  const hasAdmin = useArraySome(users, user => user.isAdmin);

  return (
    <div>
      <p>Is there an admin user? {hasAdmin ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Component;
