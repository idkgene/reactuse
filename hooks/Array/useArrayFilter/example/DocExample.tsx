import React from 'react';
import { useArrayFilter } from '../useArrayFilter';

const ExampleDemo = () => {
  const users = [
    { id: 1, active: true },
    { id: 2, active: false },
    { id: 3, active: true },
  ];

  const activeUsers = useArrayFilter(users, user => user.active);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {activeUsers.map(user => (
          <li key={user.id}>{user.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExampleDemo;
