'use client';

import { useState } from 'react';
import { useArrayUnique } from './use-array-unique';

export default function ArrayUniqueDemo() {
  const [inputValue, setInputValue] = useState('');
  const [compareFnValue, setCompareFnValue] = useState(
    '(a, b) => a.id === b.id',
  );
  const items = inputValue
    .split(',')
    .map((item, index) => ({ id: index + 1, value: item.trim() }));
  const uniqueItems = useArrayUnique(items, (a, b) => {
    try {
      const func = eval(compareFnValue);
      return func(a, b);
    } catch (error) {
      return a.value === b.value;
    }
  });

  return (
    <div className="relative mb-[10px] rounded-lg border p-[2em] transition-colors">
      <div className="mb-4">
        <label htmlFor="input" className="mb-2 block font-bold text-gray-700">
          Enter items (comma-separated):
        </label>
        <input
          id="input"
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="compareFn"
          className="mb-2 block font-bold text-gray-700"
        >
          Enter custom compare function:
        </label>
        <input
          id="compareFn"
          type="text"
          value={compareFnValue}
          onChange={(e) => {
            setCompareFnValue(e.target.value);
          }}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
      </div>
      <div className="rounded-md bg-gray-100 p-4">
        <p className="mb-2 text-lg font-semibold">Original items:</p>
        <ul className="list-disc pl-6">
          {items.map((item) => (
            <li key={item.id}>{item.value}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4 rounded-md bg-gray-100 p-4">
        <p className="mb-2 text-lg font-semibold">Unique items:</p>
        <ul className="list-disc pl-6">
          {uniqueItems.map((item) => (
            <li key={item.id}>{item.value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
