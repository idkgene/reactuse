'use client';

import React, { useState } from 'react';
import { useIntervalFn } from './useIntervalFn';

const IntervalFnDemo = () => {
  const [count, setCount] = useState(0);
  const [interval, setInterval] = useState(1000);

  const { isActive, pause, resume } = useIntervalFn(
    () => {
      setCount(prevCount => prevCount + 1);
    },
    interval,
    { immediate: false }
  );

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div></div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex justify-center items-center space-x-4">
                  <span className="text-6xl font-bold">{count}</span>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={isActive ? pause : resume}
                    className={`px-4 py-2 rounded-md text-white ${
                      isActive ? 'bg-red-500' : 'bg-green-500'
                    } focus:outline-none`}
                  >
                    {isActive ? 'Pause' : 'Resume'}
                  </button>
                  <button
                    onClick={() => setCount(0)}
                    className="px-4 py-2 rounded-md text-white bg-gray-500 focus:outline-none"
                  >
                    Reset
                  </button>
                </div>
                <div>
                  <label
                    htmlFor="interval"
                    className="block font-medium text-gray-700"
                  >
                    Interval (ms):
                  </label>
                  <input
                    id="interval"
                    type="number"
                    value={interval}
                    onChange={e => setInterval(Number(e.target.value))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntervalFnDemo;
