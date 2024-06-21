'use client';

import { useState } from 'react';

import { useArrayJoin } from './useArrayJoin';

export default function ArrayJoinDemo() {
  const [inputValue, setInputValue] = useState('');
  const [separator, setSeparator] = useState(',');
  const items = inputValue.split(',').map(item => item.trim());
  const joinedItems = useArrayJoin(items, separator);

  return (
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
      <div className="mb-4">
        <label htmlFor="input" className="block mb-2">
          Enter items (comma-separated):
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
        <label htmlFor="separator" className="block mb-2">
          Enter separator:
        </label>
        <input
          id="separator"
          type="text"
          value={separator}
          onChange={e => setSeparator(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <p className="text-lg mb-2">Joined items:</p>
        <p>{joinedItems}</p>
      </div>
    </div>
  );
}
