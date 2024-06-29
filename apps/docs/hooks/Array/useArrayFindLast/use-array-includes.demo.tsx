'use client';

import { useState } from 'react';
import { useArrayFindLast } from './use-array-includes';

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
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
          rows={6}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="searchName" className="mb-2 block font-bold">
          Search Name:
        </label>
        <input
          type="text"
          id="searchName"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
          }}
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
      </div>
      <div>
        <p className="mb-2 font-bold">Last User:</p>
        {lastUser ? (
          <pre className="rounded-md p-4">
            {JSON.stringify(lastUser, null, 2)}
          </pre>
        ) : (
          <p>No user found.</p>
        )}
      </div>
    </div>
  );
}
