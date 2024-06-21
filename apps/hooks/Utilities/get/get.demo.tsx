'use client';

import React, { useRef, useState } from 'react';
import { get } from './get';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface User {
  name: string;
  age: number;
}

const UserProfile = () => {
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
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="age">Age:</Label>
          <Input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          disabled={isFormEmpty}
          className={` ${
            isFormEmpty
              ? 'bg-gray-400 cursor-not-allowed'
              : 'hover:bg-white-600'
          }`}
        >
          Submit
        </Button>
      </form>
      {userRef.current && (
        <div>
          <p>
            <strong>Name:</strong>{' '}
            {typeof userName === 'string' ? userName : ''}
          </p>
          <p>
            <strong>Age:</strong> {typeof userAge === 'number' ? userAge : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
