'use client';
import React, { useState } from 'react';
import { useArrayEvery } from '../../hooks/Array/useArrayEvery';

type Person = {
  id: number;
  name: string;
  age: number;
};

const initialList: Person[] = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'Dave', age: 40 },
  { id: 5, name: 'Eve', age: 45 },
];

const ArrayEveryDemo: React.FC = () => {
  const [list, setList] = useState<Person[]>(initialList);
  const [ageThreshold, setAgeThreshold] = useState<number>(18);

  const isEveryPersonAboveAge = useArrayEvery(
    list,
    person => person.age >= ageThreshold
  );

  const handlePersonChange = (id: number, checked: boolean) => {
    if (checked) {
      const person = initialList.find(p => p.id === id);
      if (person) {
        setList([...list, person]);
      }
    } else {
      setList(list.filter(p => p.id !== id));
    }
  };

  const handleAgeThresholdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAgeThreshold(Number(event.target.value));
  };

  const getFirstPersonBelowThreshold = (): Person | undefined => {
    return list.find(person => person.age < ageThreshold);
  };

  const firstPersonBelowThreshold = getFirstPersonBelowThreshold();

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="ageThreshold" className="block mb-2 font-bold">
          Age Threshold:
        </label>
        <input
          id="ageThreshold"
          type="number"
          value={ageThreshold}
          max={100}
          min={0}
          onChange={handleAgeThresholdChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">People:</h2>
        <ul>
          {initialList.map(person => (
            <li key={person.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={list.some(p => p.id === person.id)}
                onChange={e => handlePersonChange(person.id, e.target.checked)}
                className="mr-2"
              />
              <span>
                {person.name} ({person.age})
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Result:</h2>
        <p>
          Is every person above the age of {ageThreshold}?{' '}
          <strong>{isEveryPersonAboveAge ? 'Yes' : 'No'}</strong>
        </p>
        {!isEveryPersonAboveAge && firstPersonBelowThreshold && (
          <p>
            The first person below the threshold is{' '}
            <strong>
              {firstPersonBelowThreshold.name} (age{' '}
              {firstPersonBelowThreshold.age})
            </strong>
            , who is{' '}
            <strong>
              {ageThreshold - firstPersonBelowThreshold.age} years below the
              threshold.
            </strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default ArrayEveryDemo;
