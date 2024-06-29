'use client';

import { useState } from 'react';
import { useArrayIncludes } from './use-array-includes';

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
      ? (item) =>
          comparator in item &&
          item[comparator as keyof typeof item] == searchValue
      : undefined,
  });

  return (
    <div className="relative mb-[10px] rounded-lg border p-[2em] transition-colors">
      <div className="relative py-3 sm:mx-auto sm:max-w-xl">
        <div className="mb-6">
          <label htmlFor="items" className="mb-2  block font-bold">
            Items:
          </label>
          <textarea
            id="items"
            value={JSON.stringify(items, null, 2)}
            onChange={(e) => {
              setItems(JSON.parse(e.target.value));
            }}
            className="w-full rounded-md border  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            rows={6}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="searchValue" className="mb-2  block font-bold">
            Search Value:
          </label>
          <input
            type="text"
            id="searchValue"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className="w-full rounded-md border  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="comparator" className="mb-2  block font-bold">
            Comparator:
          </label>
          <input
            type="text"
            id="comparator"
            value={comparator}
            onChange={(e) => {
              setComparator(e.target.value);
            }}
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div>
          <p className="mb-2 font-bold">Includes Item:</p>
          <p>{includesItem ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
}
