'use client';

import { type ChangeEvent, useState } from 'react';
import { useArrayFill } from './use-array-fill';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function ArrayFillDemo(): JSX.Element {
  const [inputArray, setInputArray] = useState('1, 2, 3, 4, 5');
  const [fillValue, setFillValue] = useState('');

  const parsedArray = inputArray.split(',').map((item) => item.trim());
  const [filledArray, fillArray] = useArrayFill(parsedArray);

  const handleFill = (): void => {
    fillArray(fillValue);
  };

  return (
    <>
      <div>
        <Label htmlFor="inputArray" className="block text-sm font-medium">
          Input Array:
        </Label>
        <Input
          id="inputArray"
          value={inputArray}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputArray(e.target.value);
          }}
        />
      </div>
      <div>
        <Label htmlFor="fillValue" className="block text-sm font-medium">
          Fill Value:
        </Label>
        <Input
          id="fillValue"
          value={fillValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setFillValue(e.target.value);
          }}
        />
      </div>
      <Button onClick={handleFill} className="mt-2">
        Fill Array
      </Button>
      <div>
        <p className="text-sm font-medium">Filled Array:</p>
        <div className="bg-secondary rounded-md">
          <pre>{JSON.stringify(filledArray, null, 2)}</pre>
        </div>
      </div>
    </>
  );
}

export default ArrayFillDemo;
