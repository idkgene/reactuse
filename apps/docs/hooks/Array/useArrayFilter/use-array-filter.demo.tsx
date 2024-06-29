'use client';

import { type SetStateAction, useState } from 'react';
import { Input } from '../../../components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectContent,
} from '../../../components/ui/select';
import { useArrayFilter } from './use-array-filter';

function ArrayFilterDemo() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [filterType, setFilterType] = useState('even');

  const isEven = (number: number) => number % 2 === 0;
  const isOdd = (number: number) => number % 2 !== 0;

  const filteredNumbers = useArrayFilter(
    numbers,
    filterType === 'even' ? isEven : isOdd,
  );

  return (
    <div className="relative mb-[10px] rounded-lg border p-[2em] transition-colors">
      <div className="mb-6">
        <Label htmlFor="numbers" className="mb-2 block font-bold">
          Numbers:
        </Label>
        <Input
          type="text"
          id="numbers"
          maxLength={20}
          value={numbers.join(', ')}
          onChange={(e) => {
            setNumbers(e.target.value.split(',').map(Number));
          }}
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="filterType" className="mb-2 block font-bold">
          Filter Type:
        </label>
        <Select
          id="filterType"
          value={filterType}
          onChange={(e: { target: { value: SetStateAction<string> } }) => {
            setFilterType(e.target.value);
          }}
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
}

export default ArrayFilterDemo;
