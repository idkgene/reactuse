'use client';

import { useState, useId } from 'react';
import { useArrayConcat } from './use-array-concat';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const MAX_ARRAYS = 3;

function ArrayConcatDemo(): JSX.Element {
  const [arrays, setArrays] = useState<string[]>(['1, 2, 3', '4, 5, 6']);
  const idPrefix = useId();

  const parseArray = (input: string): string[] =>
    input.split(',').map((item) => item.trim());

  const allArrays = arrays.map(parseArray);
  const concatenatedArray = useArrayConcat(...allArrays);

  const updateArray = (index: number, value: string): void => {
    const newArrays = [...arrays];
    newArrays[index] = value;
    setArrays(newArrays);
  };

  const addNewArray = (): void => {
    if (arrays.length < MAX_ARRAYS) {
      setArrays([...arrays, '']);
    }
  };

  return (
    <div className="space-y-4">
      {arrays.map((array, index) => (
        <div key={`${idPrefix}-array-${String(index)}`}>
          <Label
            htmlFor={`${idPrefix}-array-${String(index)}`}
            className="block text-sm font-medium"
          >
            Array {index + 1}:
          </Label>
          <Input
            id={`${idPrefix}-array-${String(index)}`}
            value={array}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              updateArray(index, e.target.value);
            }}
          />
        </div>
      ))}
      {arrays.length < MAX_ARRAYS && (
        <Button onClick={addNewArray}>Add Another Array</Button>
      )}
      <div>
        <Label className="block text-sm font-medium">Concatenated Array:</Label>
        <pre className="bg-secondary rounded-md p-2 text-xs">
          {JSON.stringify(concatenatedArray, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default ArrayConcatDemo;
