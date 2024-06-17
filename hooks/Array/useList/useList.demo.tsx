'use client';

import { useState } from 'react';

import { useList } from './useList';

export default function UseListDemo() {
  const [list, { push, removeAt, insertAt, updateAt, clear }] = useList<number>(
    [1, 2, 3]
  );
  const [inputValue, setInputValue] = useState('');

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      push(Number(inputValue));
      setInputValue('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label
            htmlFor="inputItem"
            className="block text-gray-700 font-bold mb-2"
          >
            Add Item:
          </label>
          <div className="flex">
            <input
              type="text"
              id="inputItem"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-r-md"
              onClick={handleAddItem}
            >
              Add
            </button>
          </div>
        </div>
        <ul className="space-y-2">
          {list.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{item}</span>
              <div>
                <button
                  className="text-blue-500 hover:text-blue-600 font-bold px-2 py-1"
                  onClick={() => removeAt(index)}
                >
                  Remove
                </button>
                <button
                  className="text-blue-500 hover:text-blue-600 font-bold px-2 py-1"
                  onClick={() => updateAt(index, Number(`${item}`))}
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded"
            onClick={clear}
          >
            Clear List
          </button>
        </div>
      </div>
    </div>
  );
}
