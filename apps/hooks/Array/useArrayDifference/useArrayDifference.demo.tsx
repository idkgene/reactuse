'use client';

import { useState } from 'react';
import { useArrayDifference } from './useArrayDifference';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type Person = {
  id: number;
  name: string;
};

const initialList: Person[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

const ArrayDifferenceDemo = () => {
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
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
      <div className="mb-4">
        <Label htmlFor="list" className="block mb-2 font-bold">
          List:
        </Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a person" />
          </SelectTrigger>
          <SelectContent>
            {initialList.map((person) => (
              <SelectItem key={person.id} value={person.id}>
                {person.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <Label htmlFor="values" className="block mb-2 font-bold">
          Values:
        </Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a person" />
          </SelectTrigger>
          <SelectContent>
            {initialList.map((person) => (
              <SelectItem key={person.id} value={person.id}>
                {person.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <Label htmlFor="key" className="block mb-2 font-bold">
          Key:
        </Label>
        <Select value={key} onChange={handleKeyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a person" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id">ID</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Difference:</h2>
        <ul>
          {difference.map((person) => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ArrayDifferenceDemo;
