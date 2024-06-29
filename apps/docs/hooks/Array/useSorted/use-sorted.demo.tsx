'use client';

import { useState } from 'react';
import { useSorted } from './use-sorted';

export default function UseSortedDemo() {
  const [array, setArray] = useState([3, 1, 4, 1, 5, 9, 2, 6, 5, 3]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const compareFn = (a: number, b: number) => {
    if (order === 'asc') {
      return a - b;
    }
    return b - a;
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
    <div className="relative mb-[10px] rounded-lg border p-[2em] transition-colors">
      <div className="mb-4">
        <label htmlFor="order" className="">
          Sort Order:
        </label>
        <select
          id="order"
          className="border-input flex h-10 w-[180px] items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          value={order}
          onChange={(e) => {
            setOrder(e.target.value as 'asc' | 'desc');
          }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="mb-4">
        <p>
          Original Array: <span>{array.join(', ')}</span>
        </p>
      </div>
      <div className="mb-4">
        <p>
          Sorted Array: <span>{sortedArray.join(', ')}</span>
        </p>
      </div>
      <button
        className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        onClick={handleShuffle}
      >
        Shuffle Array
      </button>
    </div>
  );
}
