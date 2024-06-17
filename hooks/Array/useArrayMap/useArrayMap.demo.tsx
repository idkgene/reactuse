'use client';

import { useState } from 'react';

import { useArrayMap } from './useArrayMap';

export default function ArrayMapDemo() {
  const [inputValue, setInputValue] = useState('');
  const [mapFunction, setMapFunction] = useState('(item) => item * 2');
  const items = inputValue.split(',').map(item => parseInt(item.trim(), 10));
  const mappedItems = useArrayMap(items, item => {
    try {
      const func = eval(mapFunction);
      return func(item);
    } catch (error) {
      return item;
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="mb-4">
            <label
              htmlFor="input"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter numbers (comma-separated):
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
              htmlFor="mapFunction"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter map function:
            </label>
            <input
              id="mapFunction"
              type="text"
              value={mapFunction}
              onChange={e => setMapFunction(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-lg font-semibold mb-2">Original items:</p>
            <p className="text-gray-800">{items.join(', ')}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md mt-4">
            <p className="text-lg font-semibold mb-2">Mapped items:</p>
            <p className="text-gray-800">{mappedItems.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
