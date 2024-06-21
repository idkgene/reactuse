'use client';

import { useState, useEffect } from 'react';
import { useTimeoutPoll } from './useTimeoutPoll';

export default function UseTimeoutPollDemo() {
  const [isMounted, setIsMounted] = useState(false);
  const [count, setCount] = useState(0);
  const [interval, setInterval] = useState(2000);
  const [immediate, setImmediate] = useState(true);

  const pollingFunction = async () => {
    setCount(prevCount => prevCount + 1);
  };

  const { isActive, pause, resume } = useTimeoutPoll(
    pollingFunction,
    interval,
    { immediate }
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleImmediateToggle = () => {
    setImmediate(prev => !prev);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="space-y-6">
        <section className="p-4 bg-white shadow-sm rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Polling Control</h2>
          <p>
            <span className="font-medium text-gray-600">Count:</span> {count}
          </p>
          <p>
            <span className="font-medium text-gray-600">Polling Status:</span>{' '}
            {isActive ? 'Active' : 'Paused'}
          </p>
          <div className="my-4">
            <label className="block font-medium text-gray-600 mb-2">
              Polling Interval (ms):
            </label>
            <input
              type="number"
              value={interval}
              max={2147483647}
              min={-2147483647}
              onChange={e => setInterval(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-600 mb-2">
              Immediate Start:
            </label>
            <input
              type="checkbox"
              checked={immediate}
              onChange={handleImmediateToggle}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={resume}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Resume
            </button>
            <button
              onClick={pause}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Pause
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
