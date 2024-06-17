'use client';

import React, { useRef, useState } from 'react';
import { get } from './get';

interface User {
  name: string;
  age: number;
}

const UserProfile: React.FC = () => {
  const userRef = useRef<User | null>(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    userRef.current = { name, age: Number(age) };
  };

  const isFormEmpty = name.trim() === '' || age.trim() === '';

  const userName = get(userRef, 'name');
  const userAge = get(userRef, 'age');

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block mb-1 font-medium">
            Age:
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={e => setAge(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isFormEmpty}
          className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isFormEmpty
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Submit
        </button>
      </form>
      {userRef.current && (
        <div>
          <p className="text-lg">
            <strong>Name:</strong>{' '}
            {typeof userName === 'string' ? userName : ''}
          </p>
          <p className="text-lg">
            <strong>Age:</strong> {typeof userAge === 'number' ? userAge : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
