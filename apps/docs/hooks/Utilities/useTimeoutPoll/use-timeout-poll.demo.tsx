'use client';

import { useState, useEffect } from 'react';
import { useTimeoutPoll } from './use-timeout-poll';

export default function UseTimeoutPollDemo(): JSX.Element | null {
  const [isMounted, setIsMounted] = useState(false);
  const [count, setCount] = useState(0);
  const [interval, setInterval] = useState(2000);
  const [immediate, setImmediate] = useState(true);

  const pollingFunction = async () => {
    setCount((prevCount) => prevCount + 1);
  };

  const { isActive, pause, resume } = useTimeoutPoll(
    pollingFunction,
    interval,
    { immediate },
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleImmediateToggle = (): void => {
    setImmediate((prev) => !prev);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="space-y-6">
        <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Polling Control</h2>
          <p>
            <span className="font-medium text-gray-600">Count:</span> {count}
          </p>
          <p>
            <span className="font-medium text-gray-600">Polling Status:</span>{' '}
            {isActive ? 'Active' : 'Paused'}
          </p>
          <div className="my-4">
            <label className="mb-2 block font-medium text-gray-600">
              Polling Interval (ms):
            </label>
            <input
              type="number"
              value={interval}
              max={2147483647}
              min={-2147483647}
              onChange={(e) => {
                setInterval(Number(e.target.value));
              }}
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block font-medium text-gray-600">
              Immediate Start:
            </label>
            <input
              type="checkbox"
              checked={immediate}
              onChange={handleImmediateToggle}
              className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={resume}
              className="rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
            >
              Resume
            </button>
            <button
              onClick={pause}
              className="rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              Pause
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
