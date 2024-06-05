import React from 'react';
import { useArrayEvery } from '../useArrayEvery';

const ExampleDemo = () => {
  const users = [
    { id: 1, active: true },
    { id: 2, active: true },
    { id: 3, active: false },
  ];

  const allActive = useArrayEvery(users, user => user.active);

  return (
    <div>
      <h1>User List</h1>
      <p>All users are active: {String(allActive)}</p>
    </div>
  );
};

export default ExampleDemo;
