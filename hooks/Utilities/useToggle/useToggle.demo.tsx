'use client';

import { useState, useEffect } from 'react';
import { useToggle } from './useToggle';

export default function UseToggleDemo() {
  const [isMounted, setIsMounted] = useState(false);

  const [isActive, toggleActive] = useToggle();

  const [status, toggleStatus] = useToggle('off', {
    truthyValue: 'on',
    falsyValue: 'off',
  });

  const [currentNumber, toggleNumber] = useToggle(0, {
    truthyValue: 1,
    falsyValue: 0,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">useToggle Hook Demo</h1>
      <div className="space-y-6">
        {/* Basic Toggle */}
        <section className="p-4 bg-white shadow-sm rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Basic Toggle</h2>
          <p>
            <span className="font-medium text-gray-600">Is Active:</span>{' '}
            {String(isActive)}
          </p>
          <button
            onClick={() => toggleActive()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Toggle Active
          </button>
        </section>

        {/* Toggle between specific strings */}
        <section className="p-4 bg-white shadow-sm rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">
            Toggle between Specific Strings
          </h2>
          <p>
            <span className="font-medium text-gray-600">Status:</span> {status}
          </p>
          <button
            onClick={() => toggleStatus()}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Toggle Status
          </button>
        </section>

        {/* Toggle between numbers */}
        <section className="p-4 bg-white shadow-sm rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Toggle between Numbers</h2>
          <p>
            <span className="font-medium text-gray-600">Current Number:</span>{' '}
            {currentNumber}
          </p>
          <button
            onClick={() => toggleNumber()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Toggle Number
          </button>
        </section>
      </div>
    </div>
  );
}
