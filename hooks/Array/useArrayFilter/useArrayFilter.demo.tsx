'use client';

import { useState } from 'react';
import { useArrayFilter } from './useArrayFilter';

const ArrayFilterDemo = () => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [filterType, setFilterType] = useState('even');

  const isEven = (number: number) => number % 2 === 0;
  const isOdd = (number: number) => number % 2 !== 0;

  const filteredNumbers = useArrayFilter(
    numbers,
    filterType === 'even' ? isEven : isOdd
  );

  return (
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
      <div className="mb-6">
        <label htmlFor="numbers" className="block font-bold mb-2">
          Numbers:
        </label>
        <input
          type="text"
          id="numbers"
          maxLength={20}
          value={numbers.join(', ')}
          onChange={e => setNumbers(e.target.value.split(',').map(Number))}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="filterType" className="block font-bold mb-2">
          Filter Type:
        </label>
        <select
          id="filterType"
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
        >
          <option value="even">Even</option>
          <option value="odd">Odd</option>
        </select>
      </div>
      <div>
        <p className="font-bold">
          Filtered Numbers: {filteredNumbers.join(', ')}
        </p>
      </div>
    </div>
  );
};

export default ArrayFilterDemo;
