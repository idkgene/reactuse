'use client';

import { useState } from 'react';

import { useArrayIncludes } from './useArrayIncludes';

export default function ArrayIncludesDemo() {
  const [items, setItems] = useState([
    { id: 1, name: 'item1' },
    { id: 2, name: 'item2' },
    { id: 3, name: 'item3' },
  ]);
  const [searchValue, setSearchValue] = useState('');
  const [comparator, setComparator] = useState('');

  const includesItem = useArrayIncludes(items, searchValue, {
    comparator: comparator
      ? item =>
          comparator in item &&
          item[comparator as keyof typeof item] == searchValue
      : undefined,
  });

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="mb-6">
            <label
              htmlFor="items"
              className="block text-gray-700 font-bold mb-2"
            >
              Items:
            </label>
            <textarea
              id="items"
              value={JSON.stringify(items, null, 2)}
              onChange={e => setItems(JSON.parse(e.target.value))}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              rows={6}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="searchValue"
              className="block text-gray-700 font-bold mb-2"
            >
              Search Value:
            </label>
            <input
              type="text"
              id="searchValue"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="comparator"
              className="block text-gray-700 font-bold mb-2"
            >
              Comparator:
            </label>
            <input
              type="text"
              id="comparator"
              value={comparator}
              onChange={e => setComparator(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <p className="text-gray-700 font-bold mb-2">Includes Item:</p>
            <p className="text-gray-600">{includesItem ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
