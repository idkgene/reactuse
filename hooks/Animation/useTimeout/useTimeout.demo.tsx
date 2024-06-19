'use client';

import React from 'react';
import { useTimeout } from './useTimeout';

const TimeoutDemo = () => {
  const { ready, start, stop } = useTimeout(3000, { controls: true });

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-semibold mb-6">useTimeout Demo</h1>
          <p className="text-xl mb-8">
            This demo showcases the useTimeout hook with controls. Click the
            buttons below to interact with the timeout.
          </p>
          <div className="mb-8">
            <button
              onClick={start}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Start Timeout
            </button>
            <button
              onClick={stop}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Stop Timeout
            </button>
          </div>
          <div className="text-2xl">
            {ready ? (
              <p className="text-green-500">✅ Timeout Ready!</p>
            ) : (
              <p className="text-gray-500">⌛ Waiting for Timeout...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeoutDemo;
