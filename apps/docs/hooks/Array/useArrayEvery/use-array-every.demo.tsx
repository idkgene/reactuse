'use client';

import { useState } from 'react';
import { Input } from '../../../components/ui/input';
import { useArrayEvery } from './use-array-every';

interface Person {
  id: number;
  name: string;
  age: number;
}

const initialList: Person[] = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'Dave', age: 40 },
  { id: 5, name: 'Eve', age: 45 },
];

function ArrayEveryDemo() {
  const [list, setList] = useState<Person[]>(initialList);
  const [ageThreshold, setAgeThreshold] = useState<number>(18);

  const isEveryPersonAboveAge = useArrayEvery(
    list,
    (person) => person.age >= ageThreshold,
  );

  const handlePersonChange = (id: number, checked: boolean) => {
    if (checked) {
      const person = initialList.find((p) => p.id === id);
      if (person) {
        setList([...list, person]);
      }
    } else {
      setList(list.filter((p) => p.id !== id));
    }
  };

  const handleAgeThresholdChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAgeThreshold(Number(event.target.value));
  };

  const getFirstPersonBelowThreshold = (): Person | undefined => {
    return list.find((person) => person.age < ageThreshold);
  };

  const firstPersonBelowThreshold = getFirstPersonBelowThreshold();

  return (
    <div className="relative mb-[10px] rounded-lg border p-[2em] transition-colors">
      <div className="mb-4">
        <label htmlFor="ageThreshold" className="mb-2 block font-bold">
          Age Threshold:
        </label>
        <Input
          id="ageThreshold"
          type="number"
          value={ageThreshold}
          onChange={handleAgeThresholdChange}
        />
      </div>

      <div className="mb-4">
        <h2 className="mb-2 text-xl font-bold">People:</h2>
        <ul>
          {initialList.map((person) => (
            <li key={person.id} className="mb-2 flex items-center">
              <label htmlFor="persons">
                {person.name} ({person.age})
              </label>
              <input
                type="checkbox"
                id="persons"
                checked={initialList.some((p) => p.id === person.id)}
                onChange={(e: { target: { checked: boolean } }) => {
                  handlePersonChange(person.id, e.target.checked);
                }}
                className="mr-2"
              />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-xl font-bold">Result:</h2>
        <p>
          Is every person above the age of {ageThreshold}?{' '}
          <strong>{isEveryPersonAboveAge ? 'Yes' : 'No'}</strong>
        </p>
        {!isEveryPersonAboveAge && firstPersonBelowThreshold ? (
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
        ) : null}
      </div>
    </div>
  );
}

export default ArrayEveryDemo;
