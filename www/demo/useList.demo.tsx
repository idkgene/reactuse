'use client';
import React, { useState } from 'react';
import { useList } from '../../hooks/Array/useList';

const UseListDemo = () => {
  const [list, { set, push, removeAt, insertAt, updateAt, clear }] = useList([
    'Apple',
    'Banana',
    'Cherry',
  ]);

  const [newItem, setNewItem] = useState('');
  const [updateIndex, setUpdateIndex] = useState<number | null>(null);

  const handleAddItem = () => {
    if (newItem) {
      push(newItem);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index: number) => {
    removeAt(index);
  };

  const handleUpdateStart = (index: number) => {
    setUpdateIndex(index);
    setNewItem(list[index]);
  };

  const handleUpdateConfirm = () => {
    if (updateIndex !== null && newItem) {
      updateAt(updateIndex, newItem);
      setUpdateIndex(null);
      setNewItem('');
    }
  };

  const handleUpdateCancel = () => {
    setUpdateIndex(null);
    setNewItem('');
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">useList Demo</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">List:</h3>
        <ul className="list-decimal pl-6 space-y-2">
          {list.map((item, index) => (
            <li key={index} className="flex items-center space-x-4">
              {updateIndex === index ? (
                <>
                  <input
                    type="text"
                    className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                  />
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleUpdateConfirm}
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleUpdateCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{item}</span>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleUpdateStart(index)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Add new item..."
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddItem}
        >
          Add
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={clear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default UseListDemo;
