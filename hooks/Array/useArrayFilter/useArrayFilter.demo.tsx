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
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="mb-6">
            <label
              htmlFor="numbers"
              className="block text-gray-700 font-bold mb-2"
            >
              Numbers:
            </label>
            <input
              type="text"
              id="numbers"
              value={numbers.join(', ')}
              onChange={e => setNumbers(e.target.value.split(',').map(Number))}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="filterType"
              className="block text-gray-700 font-bold mb-2"
            >
              Filter Type:
            </label>
            <select
              id="filterType"
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            >
              <option value="even">Even</option>
              <option value="odd">Odd</option>
            </select>
          </div>
          <div>
            <p className="text-gray-700 font-bold mb-2">Filtered Numbers:</p>
            <p className="text-gray-600">{filteredNumbers.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrayFilterDemo;
