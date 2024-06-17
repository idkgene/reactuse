'use client';

import { useState } from 'react';

import { useSorted } from './useSorted';

export default function UseSortedDemo() {
  const [array, setArray] = useState([3, 1, 4, 1, 5, 9, 2, 6, 5, 3]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const compareFn = (a: number, b: number) => {
    if (order === 'asc') {
      return a - b;
    } else {
      return b - a;
    }
  };

  const sortedArray = useSorted(array, compareFn);

  const handleShuffle = () => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setArray(shuffled);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="order" className="block text-gray-700 font-bold mb-2">
            Sort Order:
          </label>
          <select
            id="order"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={order}
            onChange={e => setOrder(e.target.value as 'asc' | 'desc')}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-bold mb-2">Original Array:</p>
          <p className="text-gray-600">{array.join(', ')}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-bold mb-2">Sorted Array:</p>
          <p className="text-gray-600">{sortedArray.join(', ')}</p>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded"
          onClick={handleShuffle}
        >
          Shuffle Array
        </button>
      </div>
    </div>
  );
}
