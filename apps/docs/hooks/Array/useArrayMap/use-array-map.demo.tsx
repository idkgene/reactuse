'use client';

import { useState } from 'react';
import { useArrayMap } from './use-array-map';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function ArrayMapDemo(): JSX.Element {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [multiplier, setMultiplier] = useState(2);

  const multipliedNumbers = useArrayMap(numbers, (num) => num * multiplier);

  const handleAddNumber = (): void => {
    const newNumber = Math.floor(Math.random() * 10) + 1;
    setNumbers([...numbers, newNumber]);
  };

  const handleRemoveNumber = (): void => {
    if (numbers.length > 0) {
      setNumbers(numbers.slice(0, -1));
    }
  };

  const handleMultiplierChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setMultiplier(Number(e.target.value));
  };

  return (
    <>
      <div>
        <Label htmlFor="multiplier" className="mr-2 font-semibold">
          Multiplier:
        </Label>
        <Input
          type="number"
          value={multiplier}
          onChange={handleMultiplierChange}
          min={1}
          max={10}
        />
      </div>
      <div className="mt-2 flex gap-3">
        <Button type="button" onClick={handleAddNumber}>
          Add Random Number
        </Button>
        <Button type="button" onClick={handleRemoveNumber}>
          Remove Last Number
        </Button>
      </div>
      <div className="mt-2">
        <span className="font-semibold">Original numbers:</span>{' '}
        {numbers.join(', ')}
      </div>
      <div>
        <span className="font-semibold">Multiplied numbers:</span>{' '}
        {multipliedNumbers.join(', ')}
      </div>
    </>
  );
}

export default ArrayMapDemo;
