'use client';
import React, { useState } from 'react';
import { useArrayDifference } from '../../hooks/Array/useArrayDifference';

type Person = {
  id: number;
  name: string;
};

const initialList: Person[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'Dave' },
  { id: 5, name: 'Eve' },
];

const ArrayDifferenceDemo: React.FC = () => {
  const [list, setList] = useState<Person[]>(initialList);
  const [values, setValues] = useState<Person[]>([]);
  const [key, setKey] = useState<keyof Person>('id');

  const difference = useArrayDifference(list, values, key);

  const handleListChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIds = Array.from(event.target.selectedOptions, option =>
      Number(option.value)
    );
    const selectedList = initialList.filter(person =>
      selectedIds.includes(person.id)
    );
    setList(selectedList);
  };

  const handleValuesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIds = Array.from(event.target.selectedOptions, option =>
      Number(option.value)
    );
    const selectedValues = initialList.filter(person =>
      selectedIds.includes(person.id)
    );
    setValues(selectedValues);
  };

  const handleKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setKey(event.target.value as keyof Person);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="list" className="block mb-2 font-bold">
          List:
        </label>
        <select
          id="list"
          multiple
          value={list.map(person => person.id.toString())}
          onChange={handleListChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          {initialList.map(person => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="values" className="block mb-2 font-bold">
          Values:
        </label>
        <select
          id="values"
          multiple
          value={values.map(person => person.id.toString())}
          onChange={handleValuesChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          {initialList.map(person => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="key" className="block mb-2 font-bold">
          Key:
        </label>
        <select
          id="key"
          value={key}
          onChange={handleKeyChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="id">ID</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Difference:</h2>
        <ul>
          {difference.map(person => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ArrayDifferenceDemo;
