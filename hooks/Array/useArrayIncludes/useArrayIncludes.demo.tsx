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
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="mb-6">
          <label htmlFor="items" className="block  font-bold mb-2">
            Items:
          </label>
          <textarea
            id="items"
            value={JSON.stringify(items, null, 2)}
            onChange={e => setItems(JSON.parse(e.target.value))}
            className="w-full px-3 py-2  border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            rows={6}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="searchValue" className="block  font-bold mb-2">
            Search Value:
          </label>
          <input
            type="text"
            id="searchValue"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="w-full px-3 py-2  border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="comparator" className="block  font-bold mb-2">
            Comparator:
          </label>
          <input
            type="text"
            id="comparator"
            value={comparator}
            onChange={e => setComparator(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div>
          <p className="font-bold mb-2">Includes Item:</p>
          <p>{includesItem ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
}
