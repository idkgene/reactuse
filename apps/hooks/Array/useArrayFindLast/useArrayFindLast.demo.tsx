'use client';

import { useState } from 'react';

import { useArrayFindLast } from './useArrayFindLast';

export default function ArrayFindLastDemo() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);
  const [searchName, setSearchName] = useState('');

  const findLastUserByName = (user: { name: string }) =>
    user.name.toLowerCase().startsWith(searchName.toLowerCase());
  const lastUser = useArrayFindLast(users, findLastUserByName);

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
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
          rows={6}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="searchName" className="block font-bold mb-2">
          Search Name:
        </label>
        <input
          type="text"
          id="searchName"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
      </div>
      <div>
        <p className="font-bold mb-2">Last User:</p>
        {lastUser ? (
          <pre className="p-4 rounded-md">
            {JSON.stringify(lastUser, null, 2)}
          </pre>
        ) : (
          <p>No user found.</p>
        )}
      </div>
    </div>
  );
}
