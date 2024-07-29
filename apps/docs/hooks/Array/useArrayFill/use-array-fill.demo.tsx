'use client';

import { useState, useMemo } from 'react';
import { useArrayFill } from './use-array-fill';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function ArrayFillDemo(): JSX.Element {
  const initialArray = useMemo(() => [1, 2, 3, 4, 5], []);
  const [array, fillArray] = useArrayFill(initialArray);
  const [fillValue, setFillValue] = useState<string>('');

  const handleFill = (): void => {
    const value = fillValue.trim() !== '' ? Number(fillValue) : 0;
    fillArray(value);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="block text-sm font-medium">Initial Array:</Label>
        <pre className="bg-secondary rounded-md p-2 text-xs">
          {JSON.stringify(initialArray, null, 1)}
        </pre>
      </div>
      <div className="flex items-end space-x-4">
        <div className="grow">
          <Label htmlFor="fillValue" className="block text-sm font-medium">
            Fill Value:
          </Label>
          <Input
            id="fillValue"
            type="number"
            value={fillValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFillValue(e.target.value);
            }}
            placeholder="Enter a number"
          />
        </div>
        <Button onClick={handleFill}>Fill Array</Button>
      </div>
      <div>
        <Label className="block text-sm font-medium">Current Array:</Label>
        <pre className="bg-secondary rounded-md p-2 text-xs">
          {JSON.stringify(array, null, 1)}
        </pre>
      </div>
    </div>
  );
}

export default ArrayFillDemo;
