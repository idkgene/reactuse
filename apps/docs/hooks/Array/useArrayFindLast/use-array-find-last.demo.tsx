'use client';

import { useState } from 'react';
import { useArrayFindLast } from './use-array-find-last';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function ArrayFindLastDemo(): JSX.Element {
  const [numbers, setNumbers] = useState([1, 3, 5, 2, 4, 6, 3, 7, 8]);
  const [threshold, setThreshold] = useState(4);

  const lastNumberAboveThreshold = useArrayFindLast(
    numbers,
    (num) => num > threshold,
  );

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
        <label htmlFor="threshold" className="mr-2 font-semibold">
          Threshold:
        </label>
        <Input
          type="number"
          value={threshold}
          onChange={handleThresholdChange}
          min={0}
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
        <span className="font-semibold">Current numbers:</span>{' '}
        {numbers.join(', ')}
      </div>
      <div>
        <span className="font-semibold">Last number above {threshold}:</span>{' '}
        {lastNumberAboveThreshold ?? 'None'}
      </div>
    </>
  );
}

export default ArrayFindLastDemo;
