'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useArrayFilter } from './use-array-filter';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Person {
  id: number;
  name: string;
  age: number;
}

function ArrayFilterDemo(): JSX.Element {
  const [filterCriteria, setFilterCriteria] = useState<string>('21');
  const [filterType, setFilterType] = useState<'age' | 'name'>('age');
  const [useFunction, setUseFunction] = useState<boolean>(false);

  const people: Person[] = useMemo(
    () => [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 20 },
    ],
    [],
  );

  const getPeople = useCallback(() => people, [people]);

  const predicate = useMemo(() => {
    if (filterType === 'age') {
      return (person: Person) => person.age >= Number(filterCriteria);
    }
    return (person: Person) =>
      person.name.toLowerCase().includes(filterCriteria.toLowerCase());
  }, [filterType, filterCriteria]);

  const filteredPeople = useArrayFilter(
    useFunction ? getPeople : people,
    predicate,
  );

  useEffect(() => {
    if (filterType === 'age') {
      setFilterCriteria('18');
    } else {
      setFilterCriteria('');
    }
  }, [filterType]);

  return (
    <div className="space-y-4">
      <div>
        <Label className="block text-sm font-medium">Original People:</Label>
        <pre className="bg-secondary rounded-md p-2 text-xs">
          {JSON.stringify(people, null, 2)}
        </pre>
      </div>
      <RadioGroup
        value={filterType}
        onValueChange={(value: string) => {
          setFilterType(value as 'age' | 'name');
        }}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="age" id="age" />
          <Label htmlFor="age">Filter by Age</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="name" id="name" />
          <Label htmlFor="name">Filter by Name</Label>
        </div>
      </RadioGroup>
      <div className="flex items-end space-x-4">
        <div className="grow">
          <Label htmlFor="filterCriteria" className="block text-sm font-medium">
            {filterType === 'age' ? 'Minimum Age:' : 'Name Contains:'}
          </Label>
          <Input
            id="filterCriteria"
            type={filterType === 'age' ? 'number' : 'text'}
            value={filterCriteria}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFilterCriteria(e.target.value);
            }}
            placeholder={
              filterType === 'age' ? 'Enter minimum age' : 'Enter name'
            }
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="useFunction"
            checked={useFunction}
            onCheckedChange={(checked) => {
              setUseFunction(checked as boolean);
            }}
          />
          <Label htmlFor="useFunction" className="text-sm">
            Use Function Input
          </Label>
        </div>
      </div>
      <div>
        <Label className="block text-sm font-medium">Filtered People:</Label>
        <pre className="bg-secondary rounded-md p-2 text-xs">
          {JSON.stringify(filteredPeople, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default ArrayFilterDemo;
