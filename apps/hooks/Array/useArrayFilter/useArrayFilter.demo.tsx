'use client';

import { useState } from 'react';
import { useArrayFilter } from './useArrayFilter';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectContent,
} from '@/components/ui/select';

const ArrayFilterDemo = () => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [filterType, setFilterType] = useState('even');

  const isEven = (number: number) => number % 2 === 0;
  const isOdd = (number: number) => number % 2 !== 0;

  const filteredNumbers = useArrayFilter(
    numbers,
    filterType === 'even' ? isEven : isOdd,
  );

  return (
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
      <div className="mb-6">
        <Label htmlFor="numbers" className="block font-bold mb-2">
          Numbers:
        </Label>
        <Input
          type="text"
          id="numbers"
          maxLength={20}
          value={numbers.join(', ')}
          onChange={(e) => setNumbers(e.target.value.split(',').map(Number))}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
        />
      </div>
      <div className="mb-6">
        <Label htmlFor="filterType" className="block font-bold mb-2">
          Filter Type:
        </Label>
        <Select
          id="filterType"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an order" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filter</SelectLabel>
              <SelectItem value="even">Even</SelectItem>
              <SelectItem value="odd">Odd</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <p className="text-sm font-bold">
          Filtered Numbers: {filteredNumbers.join(', ')}
        </p>
      </div>
    </div>
  );
};

export default ArrayFilterDemo;
