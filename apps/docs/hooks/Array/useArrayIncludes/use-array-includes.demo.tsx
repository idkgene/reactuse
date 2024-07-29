'use client';

import { useState, useMemo } from 'react';
import { useArrayIncludes } from './use-array-includes';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Person {
  id: number;
  name: string;
  age: number;
}

type ComparatorType = 'default' | 'function' | 'key';

function ArrayIncludesDemo(): JSX.Element {
  const list: Person[] = useMemo(
    () => [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
    ],
    [],
  );

  const [searchValue, setSearchValue] = useState('');
  const [comparatorType, setComparatorType] =
    useState<ComparatorType>('default');
  const [fromIndex, setFromIndex] = useState(0);
  const [useFromIndex, setUseFromIndex] = useState(false);

  const options = useMemo(() => {
    let comparator: ((person: Person) => boolean) | keyof Person | undefined;

    if (comparatorType === 'function') {
      comparator = (person: Person) =>
        person.name.toLowerCase().includes(searchValue.toLowerCase());
    } else if (comparatorType === 'key') {
      comparator = 'name';
    }

    return {
      comparator,
      ...(useFromIndex ? { fromIndex } : {}),
    };
  }, [comparatorType, searchValue, fromIndex, useFromIndex]);

  const isIncluded = useArrayIncludes(list, searchValue, options);

  const getMatchedItems = (): Person[] => {
    switch (comparatorType) {
      case 'function':
        return list.filter((person) =>
          person.name.toLowerCase().includes(searchValue.toLowerCase()),
        );
      case 'key':
        return list.filter((person) => person.name === searchValue);
      default:
        return list.filter(
          (person) =>
            person.name === searchValue ||
            person.age === Number(searchValue) ||
            person.id === Number(searchValue),
        );
    }
  };

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
          <Label htmlFor="searchValue" className="text-sm">
            Search Value:
          </Label>
          <Input
            id="searchValue"
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchValue(e.target.value);
            }}
            placeholder="Enter search value"
          />
        </div>
        <div>
          <Label htmlFor="comparatorType" className="text-sm">
            Comparator Type:
          </Label>
          <Select
            onValueChange={(value) => {
              setComparatorType(value as 'default' | 'function' | 'key');
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select comparator type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="function">Function</SelectItem>
                <SelectItem value="key">Key</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="useFromIndex"
            checked={useFromIndex}
            onCheckedChange={(checked) => {
              setUseFromIndex(checked as boolean);
            }}
          />
          <Label htmlFor="useFromIndex" className="text-sm">
            Use From Index
          </Label>
        </div>
        {useFromIndex ? (
          <div>
            <Label htmlFor="fromIndex" className="text-sm">
              From Index:
            </Label>
            <Input
              id="fromIndex"
              type="number"
              value={fromIndex}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFromIndex(Number(e.target.value));
              }}
              min={0}
            />
          </div>
        ) : null}
      </div>
      <div>
        <Label className="block text-sm font-medium">Is Included:</Label>
        <pre className="bg-secondary rounded-md p-2 text-xs">
          {isIncluded.toString()}
        </pre>
      </div>
      <div>
        <Label className="block text-sm font-medium">Current Options:</Label>
        <pre className="bg-secondary rounded-md p-2 text-xs">
          {JSON.stringify(options, null, 2)}
        </pre>
      </div>
      {comparatorType === 'function' && (
        <div>
          <Label className="block text-sm font-medium">
            Current Comparator Function:
          </Label>
          <pre className="bg-secondary rounded-md p-2 text-xs">
            {`(person) => person.name.toLowerCase().includes("${searchValue.toLowerCase()}")`}
          </pre>
        </div>
      )}
      {isIncluded ? (
        <div>
          <Label className="block text-sm font-medium">Matched Item(s):</Label>
          <pre className="bg-secondary rounded-md p-2 text-xs">
            {JSON.stringify(getMatchedItems(), null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  );
}

export default ArrayIncludesDemo;
