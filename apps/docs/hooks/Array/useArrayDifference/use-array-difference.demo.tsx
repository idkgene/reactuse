'use client';

import { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../../components/ui/select';
import { useArrayDifference } from './use-array-difference';

interface Person {
  id: number;
  name: string;
}

const initialList: Person[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

function ArrayDifferenceDemo() {
  const [list, setList] = useState<Person[]>(initialList);
  const [values, setValues] = useState<Person[]>([]);
  const [key, setKey] = useState<keyof Person>('id');

  const difference = useArrayDifference(list, values, key);

  const handleListChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIds = Array.from(event.target.selectedOptions, (option) =>
      Number(option.value),
    );
    const selectedList = initialList.filter((person) =>
      selectedIds.includes(person.id),
    );
    setList(selectedList);
  };

  const handleValuesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIds = Array.from(event.target.selectedOptions, (option) =>
      Number(option.value),
    );
    const selectedValues = initialList.filter((person) =>
      selectedIds.includes(person.id),
    );
    setValues(selectedValues);
  };

  const handleKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setKey(event.target.value as keyof Person);
  };

  return (
    <div className="relative mb-[10px] rounded-lg border p-[2em] transition-colors">
      <div className="mb-4">
        <label htmlFor="list" className="mb-2 block font-bold">
          List:
        </label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a person" />
          </SelectTrigger>
          <SelectContent>
            {initialList.map((person) => (
              <SelectItem key={person.id} value={person.id.toString()}>
                {person.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <label htmlFor="values" className="mb-2 block font-bold">
          Values:
        </label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a person" />
          </SelectTrigger>
          <SelectContent>
            {initialList.map((person) => (
              <SelectItem key={person.id} value={person.id.toString()}>
                {person.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <label htmlFor="key" className="mb-2 block font-bold">
          Key:
        </label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a key" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id">ID</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h2 className="mb-2 text-xl font-bold">Difference:</h2>
        <ul>
          {difference.map((person) => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default ArrayDifferenceDemo;
