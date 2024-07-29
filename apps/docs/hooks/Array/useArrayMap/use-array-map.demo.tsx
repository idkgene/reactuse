'use client';

import { useState, useMemo } from 'react';
import { useArrayMap } from './use-array-map';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Person {
  id: number;
  name: string;
}

function ArrayMapDemo(): JSX.Element {
  const [listType, setListType] = useState('normal');
  const [prefix, setPrefix] = useState('');

  const list: Person[] = useMemo(
    () => [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ],
    [],
  );

  const refList = listType === 'refList' ? () => list : list;

  const refItems =
    listType === 'refItems' ? list.map((item) => () => item) : refList;

  const mapFunction = (
    person: Person,
  ): {
    id: number;
    name: string;
  } => ({
    id: person.id,
    name: `${prefix}${person.name}`,
  });

  const mappedArray = useArrayMap(refItems, mapFunction);

  return (
    <div className="space-y-4">
      <div>
        <Label className="block text-sm font-medium">Original List:</Label>
        <pre className="bg-secondary rounded-md p-2 text-xs">
          {JSON.stringify(list, null, 2)}
        </pre>
      </div>
      <RadioGroup value={listType} onValueChange={setListType}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="normal" id="r1" />
          <Label htmlFor="r1">Normal List</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="refList" id="r2" />
          <Label htmlFor="r2">Use Ref for List</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="refItems" id="r3" />
          <Label htmlFor="r3">Use Ref for Items</Label>
        </div>
      </RadioGroup>
      <div>
        <Label htmlFor="prefix" className="block text-sm font-medium">
          Name Prefix:
        </Label>
        <Input
          id="prefix"
          value={prefix}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPrefix(e.target.value);
          }}
          className="mt-1"
        />
      </div>
      <div>
        <Label className="block text-sm font-medium">Mapped Array:</Label>
        <pre className="bg-secondary rounded-md p-2 text-xs">
          {JSON.stringify(mappedArray, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default ArrayMapDemo;
