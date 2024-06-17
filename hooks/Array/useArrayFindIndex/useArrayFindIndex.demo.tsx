'use client';

import { useState } from 'react';

import { useArrayFindIndex } from './useArrayFindIndex';

export default function ArrayFindIndexDemo() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);
  const [searchId, setSearchId] = useState('');

  const findUserIndexById = (user: { id: number }) =>
    user.id === parseInt(searchId);
  const userIndex = useArrayFindIndex(users, findUserIndexById);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="mb-6">
            <label
              htmlFor="users"
              className="block text-gray-700 font-bold mb-2"
            >
              Users:
            </label>
            <textarea
              id="users"
              value={JSON.stringify(users, null, 2)}
              onChange={e => setUsers(JSON.parse(e.target.value))}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              rows={6}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="searchId"
              className="block text-gray-700 font-bold mb-2"
            >
              Search User ID:
            </label>
            <input
              type="text"
              id="searchId"
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <p className="text-gray-700 font-bold mb-2">User Index:</p>
            {userIndex !== -1 ? (
              <p className="text-gray-600">{userIndex}</p>
            ) : (
              <p className="text-gray-600">User not found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
