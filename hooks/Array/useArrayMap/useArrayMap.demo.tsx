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
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
      <div className="mb-4">
        <label htmlFor="input" className="block mb-2">
          Enter numbers (comma-separated):
        </label>
        <input
          id="input"
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="mapFunction" className="block mb-2">
          Enter map function:
        </label>
        <input
          id="mapFunction"
          type="text"
          value={mapFunction}
          onChange={e => setMapFunction(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <p className="text-lg">Original items: {items.join(', ')}</p>
      </div>
      <div>
        <p className="text-lg">Mapped items: {mappedItems.join(', ')}</p>
      </div>
    </div>
  );
}
