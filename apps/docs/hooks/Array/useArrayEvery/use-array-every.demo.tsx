'use client';

import { useState } from 'react';
import { Input } from '../../../components/ui/input';
import { useArrayEvery } from './use-array-every';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

function ArrayEveryDemo(): JSX.Element {
  const [numbers, setNumbers] = useState([2, 3, 4, 5]);
  const [threshold, setThreshold] = useState(1);

  const allAboveThreshold = useArrayEvery(numbers, (num) => num > threshold);

  const handleAddNumber = (): void => {
    const newNumber = Math.floor(Math.random() * 10) + 1;
    setNumbers([...numbers, newNumber]);
  };

  const handleRemoveNumber = (): void => {
    if (numbers.length > 0) {
      setNumbers(numbers.slice(0, -1));
    }
  };

  const handleThresholdChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setThreshold(Number(e.target.value));
  };

  return (
    <>
      <div>
        <Label htmlFor="threshold" className="mr-2 font-semibold">
          Threshold:
        </Label>
        <Input
          type="number"
          value={threshold}
          onChange={handleThresholdChange}
        />
      </div>
      <div className="mt-4 flex gap-3">
        <Button type="button" onClick={handleAddNumber}>
          Add Random Number
        </Button>
        <Button type="button" onClick={handleRemoveNumber}>
          Remove Last Number
        </Button>
      </div>
      <div className="mt-2">
        <span className="font-semibold">Current numbers:</span>{' '}
        {numbers.join(', ')}
      </div>
      <div>
        <span className="font-semibold">
          All numbers are above {threshold}:
        </span>{' '}
        {allAboveThreshold ? 'Yes' : 'No'}
      </div>
    </>
  );
}

export default ArrayEveryDemo;
