import { whenever } from '../whenever';
import * as React from 'react';

const Component = () => {
  const [user, setUser] = React.useState<{ id: number; name: string } | null>(
    null
  );

  whenever(
    user,
    (current, previous) => {
      console.log('User changed:', current);
    },
    { once: true }
  );

  const handleLogin = () => {
    setUser({ id: 1, name: 'John' });
  };

  return (
    <div>
      {user ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default Component;
