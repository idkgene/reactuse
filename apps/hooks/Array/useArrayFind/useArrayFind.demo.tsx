'use client';

import { useState } from 'react';

import { useArrayFind } from './useArrayFind';

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
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
      <div className="mb-6">
        <label htmlFor="users" className="block font-bold mb-2">
          Users:
        </label>
        <textarea
          id="users"
          value={JSON.stringify(users, null, 2)}
          onChange={e => setUsers(JSON.parse(e.target.value))}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
          rows={6}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="searchId" className="block font-bold mb-2">
          Search User ID:
        </label>
        <input
          type="text"
          id="searchId"
          value={searchId}
          onChange={e => setSearchId(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
        />
      </div>
      <div>
        <p className="font-bold mb-2">Found User:</p>
        {foundUser ? (
          <pre className="p-4 rounded-md">
            {JSON.stringify(foundUser, null, 2)}
          </pre>
        ) : (
          <p>No user found.</p>
        )}
      </div>
    </div>
  );
}
