'use client';

import { useState } from 'react';
import { useArrayMap } from './use-array-map';

export default function ArrayMapDemo() {
  const [inputValue, setInputValue] = useState('');
  const [mapFunction, setMapFunction] = useState('(item) => item * 2');
  const items = inputValue.split(',').map((item) => parseInt(item.trim(), 10));
  const mappedItems = useArrayMap(items, (item) => {
    try {
      const func = eval(mapFunction);
      return func(item);
    } catch (error) {
      return item;
    }
  });

  return (
    <div className="relative mb-[10px] rounded-lg border p-[2em] transition-colors">
      <div className="mb-4">
        <label htmlFor="input" className="mb-2 block">
          Enter numbers (comma-separated):
        </label>
        <input
          id="input"
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="mapFunction" className="mb-2 block">
          Enter map function:
        </label>
        <input
          id="mapFunction"
          type="text"
          value={mapFunction}
          onChange={(e) => {
            setMapFunction(e.target.value);
          }}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
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
