'use client';

import { useState } from 'react';
import { Input } from '../../../components/ui/input';
import { useArrayFilter } from './use-array-filter';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

function ArrayFilterDemo(): JSX.Element {
  const [inputArray, setInputArray] = useState('1, 2, 3, 4, 5');
  const [filterConditions, setFilterConditions] = useState({
    even: false,
    odd: false,
    greaterThan3: false,
  });

  const parsedArray = inputArray
    .split(',')
    .map((item) => parseInt(item.trim(), 10));

  const filterFunctions: Record<string, (item: number) => boolean> = {
    even: (item) => item % 2 === 0,
    odd: (item) => item % 2 !== 0,
    greaterThan3: (item) => item > 3,
  };

  const combinedFilterFunction = (item: number): boolean => {
    return Object.entries(filterConditions).some(
      ([key, isActive]) => isActive && filterFunctions[key](item),
    );
  };

  const filteredArray = useArrayFilter(parsedArray, combinedFilterFunction);

  const handleCheckboxChange = (condition: string): void => {
    setFilterConditions((prev) => ({
      ...prev,
      [condition]: !prev[condition as keyof typeof filterConditions],
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="inputArray" className="block text-sm font-medium">
          Input Array:
        </Label>
        <Input
          id="inputArray"
          value={inputArray}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputArray(e.target.value);
          }}
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Filter Conditions:</p>
        <div className="space-y-2">
          {Object.keys(filterConditions).map((condition) => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox
                id={condition}
                checked={
                  filterConditions[condition as keyof typeof filterConditions]
                }
                onCheckedChange={() => {
                  handleCheckboxChange(condition);
                }}
              />
              <Label htmlFor={condition} className="text-sm">
                {condition === 'greaterThan3' ? 'Greater than 3' : condition}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium">Filtered Array:</p>
        <pre className="bg-secondary mt-2 rounded-md p-4 text-sm">
          {JSON.stringify(filteredArray, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default ArrayFilterDemo;
