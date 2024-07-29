'use client';

import { useState, useMemo } from 'react';
import { useArrayIntersection } from './use-array-intersection';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface ArrayItem {
  id: string;
  values: string[];
  useFunction: boolean;
}

const MAX_ARRAYS = 3;

function ArrayIntersectionDemo(): JSX.Element {
  const [arrays, setArrays] = useState<ArrayItem[]>([
    { id: '1', values: ['a', 'b', 'c', 'd'], useFunction: false },
    { id: '2', values: ['b', 'c', 'd', 'e'], useFunction: false },
  ]);
  const [newArray, setNewArray] = useState<string>('');

  const arrayOrGetters = useMemo(
    () =>
      arrays.map((arr) => (arr.useFunction ? () => arr.values : arr.values)),
    [arrays],
  );

  const intersection = useArrayIntersection(...arrayOrGetters);

  const handleAddArray = (): void => {
    if (newArray.trim() && arrays.length < MAX_ARRAYS) {
      const newId = (
        Math.max(...arrays.map((arr) => parseInt(arr.id))) + 1
      ).toString();
      setArrays([
        ...arrays,
        {
          id: newId,
          values: newArray.split(',').map((item) => item.trim()),
          useFunction: false,
        },
      ]);
      setNewArray('');
    }
  };

  const handleRemoveArray = (id: string): void => {
    setArrays(arrays.filter((arr) => arr.id !== id));
  };

  const toggleUseFunction = (id: string): void => {
    setArrays(
      arrays.map((arr) =>
        arr.id === id ? { ...arr, useFunction: !arr.useFunction } : arr,
      ),
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="block text-sm font-medium">
          Arrays ({arrays.length}/{MAX_ARRAYS}):
        </Label>
        {arrays.map((arr) => (
          <div key={arr.id} className="mt-2 flex items-center space-x-2">
            <pre className="bg-secondary grow rounded-md p-2 text-xs">
              {JSON.stringify(arr.values)}
            </pre>
            <Checkbox
              checked={arr.useFunction}
              onCheckedChange={() => {
                toggleUseFunction(arr.id);
              }}
              id={`useFunction-${arr.id}`}
            />
            <Label htmlFor={`useFunction-${arr.id}`} className="text-sm">
              Use as function
            </Label>
            <Button
              onClick={() => {
                handleRemoveArray(arr.id);
              }}
              variant="destructive"
              size="sm"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <Input
          value={newArray}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewArray(e.target.value);
          }}
          placeholder="Enter comma-separated values"
          disabled={arrays.length >= MAX_ARRAYS}
        />
        <Button onClick={handleAddArray} disabled={arrays.length >= MAX_ARRAYS}>
          Add Array
        </Button>
      </div>
      {arrays.length >= MAX_ARRAYS && (
        <p className="text-sm text-red-500">
          Maximum number of arrays reached.
        </p>
      )}
      <div>
        <Label className="block text-sm font-medium">Intersection:</Label>
        <pre className="bg-secondary rounded-md p-2 text-xs">
          {JSON.stringify(intersection, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default ArrayIntersectionDemo;
