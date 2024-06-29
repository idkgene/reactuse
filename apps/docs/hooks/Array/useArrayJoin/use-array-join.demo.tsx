'use client';

import { useState } from 'react';
import { useArrayJoin } from './use-array-join';

export default function ArrayJoinDemo() {
  const [inputValue, setInputValue] = useState('');
  const [separator, setSeparator] = useState(',');
  const items = inputValue.split(',').map((item) => item.trim());
  const joinedItems = useArrayJoin(items, separator);

  return (
    <div className="relative mb-[10px] rounded-lg border p-[2em] transition-colors">
      <div className="mb-4">
        <label htmlFor="input" className="mb-2 block">
          Enter items (comma-separated):
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
        <label htmlFor="separator" className="mb-2 block">
          Enter separator:
        </label>
        <input
          id="separator"
          type="text"
          value={separator}
          onChange={(e) => {
            setSeparator(e.target.value);
          }}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
        />
      </div>
      <div>
        <p className="mb-2 text-lg">Joined items:</p>
        <p>{joinedItems}</p>
      </div>
    </div>
  );
}
