'use client';

import { useState } from 'react';
import { useArrayFlatMap } from './use-array-flat-map';
import { Input } from '@/components/ui/input';

function ArrayFlatMapDemo(): JSX.Element {
  const [inputArray, setInputArray] = useState('1, 2, 3, 4, 5');

  const parsedArray = inputArray.split(',').map((item) => item.trim());

  const flatMappedArray = useArrayFlatMap(parsedArray, (item) => {
    const num = parseInt(item);
    return [num, num * 2];
  });

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="inputArray" className="block text-sm font-medium">
          Input Array:
        </label>
        <Input
          id="inputArray"
          value={inputArray}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputArray(e.target.value);
          }}
        />
      </div>
      <div>
        <p className="text-sm font-medium">Flat Mapped Array:</p>
        <div className="bg-secondary rounded-md">
          <pre>{JSON.stringify(flatMappedArray, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default ArrayFlatMapDemo;
