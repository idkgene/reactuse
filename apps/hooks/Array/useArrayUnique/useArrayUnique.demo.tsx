'use client';

import { useState } from 'react';

import { useArrayUnique } from './useArrayUnique';

export default function ArrayUniqueDemo() {
  const [inputValue, setInputValue] = useState('');
  const [compareFnValue, setCompareFnValue] = useState(
    '(a, b) => a.id === b.id'
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
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
          <div className="mb-4">
            <label
              htmlFor="input"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter items (comma-separated):
            </label>
            <input
              id="input"
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="compareFn"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter custom compare function:
            </label>
            <input
              id="compareFn"
              type="text"
              value={compareFnValue}
              onChange={e => setCompareFnValue(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-lg font-semibold mb-2">Original items:</p>
            <ul className="list-disc pl-6">
              {items.map(item => (
                <li key={item.id}>{item.value}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 p-4 rounded-md mt-4">
            <p className="text-lg font-semibold mb-2">Unique items:</p>
            <ul className="list-disc pl-6">
              {uniqueItems.map(item => (
                <li key={item.id}>{item.value}</li>
              ))}
            </ul>
          </div>
    </div>
  );
}
