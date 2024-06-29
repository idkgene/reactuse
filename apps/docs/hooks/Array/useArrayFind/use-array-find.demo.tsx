'use client';

import { useState } from 'react';
import { useArrayFind } from './use-array-find';

export default function ArrayFindDemo() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);
  const [searchId, setSearchId] = useState('');

  const findUserById = (user: { id: number }) => user.id === parseInt(searchId);
  const foundUser = useArrayFind(users, findUserById);

  return (
    <div className="relative mb-[10px] rounded-lg border p-[2em] transition-colors">
      <div className="mb-6">
        <label htmlFor="users" className="mb-2 block font-bold">
          Users:
        </label>
        <textarea
          id="users"
          value={JSON.stringify(users, null, 2)}
          onChange={(e) => {
            setUsers(JSON.parse(e.target.value));
          }}
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
          rows={6}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="searchId" className="mb-2 block font-bold">
          Search User ID:
        </label>
        <input
          type="text"
          id="searchId"
          value={searchId}
          onChange={(e) => {
            setSearchId(e.target.value);
          }}
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
        />
      </div>
      <div>
        <p className="mb-2 font-bold">Found User:</p>
        {foundUser ? (
          <pre className="rounded-md p-4">
            {JSON.stringify(foundUser, null, 2)}
          </pre>
        ) : (
          <p>No user found.</p>
        )}
      </div>
    </div>
  );
}
