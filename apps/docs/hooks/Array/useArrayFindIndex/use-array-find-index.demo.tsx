'use client';

import { useState, useMemo } from 'react';
import { useArrayFindIndex } from './use-array-find-index';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface Person {
  id: number;
  name: string;
  age: number;
}

function ArrayFindIndexDemo(): JSX.Element {
  const list: Person[] = useMemo(
    () => [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
    ],
    [],
  );

  const [searchName, setSearchName] = useState('Alice');
  const [searchAge, setSearchAge] = useState('');
  const [useFunction, setUseFunction] = useState(false);

  const predicate = (person: Person) => {
    return (
      person.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchAge === '' || person.age === parseInt(searchAge, 10))
    );
  };

  const arrayOrFunction = useFunction ? () => list : list;

  const foundIndex = useArrayFindIndex(arrayOrFunction, predicate, [
    searchName,
    searchAge,
  ]);

  return (
    <div className="space-y-4">
      <div>
        <Label className="block text-sm font-medium">List:</Label>
        <pre className="bg-secondary rounded-md p-2 text-xs">
          {JSON.stringify(list, null, 2)}
        </pre>
      </div>
      <div className="space-y-2">
        <div>
          <Label htmlFor="searchName" className="text-sm">
            Search by Name:
          </Label>
          <Input
            id="searchName"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
            placeholder="Enter name"
          />
        </div>
        <div>
          <Label htmlFor="searchAge" className="text-sm">
            Search by Age:
          </Label>
          <Input
            id="searchAge"
            type="number"
            value={searchAge}
            onChange={(e) => {
              setSearchAge(e.target.value);
            }}
            placeholder="Enter age"
          />
        </div>
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
          Use Function Instead of Array
        </Label>
      </div>
      <div>
        <Label className="block text-sm font-medium">Found Index:</Label>
        <pre className="bg-secondary rounded-md p-2 text-xs">{foundIndex}</pre>
      </div>
      {foundIndex !== -1 && (
        <div>
          <Label className="block text-sm font-medium">Found Person:</Label>
          <pre className="bg-secondary rounded-md p-2 text-xs">
            {JSON.stringify(list[foundIndex], null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default ArrayFindIndexDemo;
