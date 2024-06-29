'use client';

import { useRef, useState, type ChangeEvent } from 'react';
import { get } from './get';
import { Input } from '@/components/Common/Input/input';
import { Button } from '@/components/Common/Button/button';

interface User {
  name: string;
  age: number;
  address: {
    city: string;
  };
}

export default function UserProfile(): JSX.Element {
  const userRef = useRef<User | null>(null);
  const [name, setName] = useState('Jean');
  const [age, setAge] = useState('21');
  const [city, setCity] = useState('Krakow');
  const [accessKey, setAccessKey] = useState('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    userRef.current = {
      name,
      age: Number(age),
      address: { city },
    };
  };

  const handleAccess = (): void => {
    try {
      const value = get(userRef, accessKey as keyof User);
      setResult(`Value for "${accessKey}": ${JSON.stringify(value, null, 2)}`);
      setError('');
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error: ${err.message}`);
      } else {
        setError('An unknown error occurred');
      }
      setResult('');
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const isFormEmpty =
    name.trim() === '' || age.trim() === '' || city.trim() === '';

  return (
    <div className="rounded-lg border p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label htmlFor="name" className="block">
            Name:
          </label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={handleInputChange(setName)}
            className="w-full rounded border p-1"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="age" className="block">
            Age:
          </label>
          <Input
            type="number"
            id="age"
            value={age}
            onChange={handleInputChange(setAge)}
            className="w-full rounded border p-1"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="city" className="block">
            City:
          </label>
          <Input
            type="text"
            id="city"
            value={city}
            onChange={handleInputChange(setCity)}
            className="w-full rounded border p-1"
          />
        </div>
        <Button
          variant="secondary"
          type="submit"
          disabled={isFormEmpty}
          className={`rounded p-2 ${
            isFormEmpty
              ? 'cursor-not-allowed bg-gray-300'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Submit
        </Button>
      </form>

      <div className="mt-4">
        <h3 className="mb-2 text-lg font-bold">Access User Data</h3>
        <div className="flex">
          <Input
            type="text"
            value={accessKey}
            onChange={handleInputChange(setAccessKey)}
            placeholder="Enter key (e.g., name, age, city)"
          />
          <Button variant="secondary" type="button" onClick={handleAccess}>
            Access
          </Button>
          <div>
            {result ? (
              <div className="mt-2 select-none rounded p-2 text-sm font-medium">
                <pre>{result}</pre>
              </div>
            ) : null}
            {error ? (
              <div className="mt-2 select-none rounded p-2 text-sm font-medium">
                {error}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {userRef.current ? (
        <div className="mt-4">
          <h3 className="mb-2 text-base font-semibold">Current User Data</h3>
          <pre className="rounded p-2">
            {JSON.stringify(userRef.current, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  );
}
