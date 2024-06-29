'use client';

import { useState, useEffect } from 'react';
import { useToNumber } from './use-to-number';

export default function UseToNumberDemo(): JSX.Element | null {
  const [isMounted, setIsMounted] = useState(false);

  const [stringValue, setStringValue] = useState('42.42');
  const numberFromString = useToNumber(stringValue, {
    method: 'parseFloat',
    nanToZero: true,
  });

  const [intValue, setIntValue] = useState('42');
  const numberFromInt = useToNumber(intValue, {
    method: 'parseInt',
    radix: 10,
  });

  const [invalidValue, setInvalidValue] = useState('invalid');
  const numberFromInvalid = useToNumber(invalidValue, { nanToZero: true });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="not-prose container mx-auto p-8">
      <div className="space-y-6">
        <section className="space-y-6 rounded-lg border bg-white p-4 shadow-sm">
          <div>
            <h2 className="mb-2 text-xl font-semibold">
              Using parseFloat (default)
            </h2>
            <div className="mb-4">
              <label className="mb-2 block font-medium text-gray-600">
                String Value:
              </label>
              <input
                type="text"
                value={stringValue}
                onChange={(e) => {
                  setStringValue(e.target.value);
                }}
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p>
              <span className="font-medium text-gray-600">Number:</span>{' '}
              {numberFromString}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">
              Using parseInt with radix 10
            </h2>
            <div className="mb-4">
              <label className="mb-2 block font-medium text-gray-600">
                Integer Value:
              </label>
              <input
                type="text"
                value={intValue}
                onChange={(e) => {
                  setIntValue(e.target.value);
                }}
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p>
              <span className="font-medium text-gray-600">Number:</span>{' '}
              {numberFromInt}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">
              Returning 0 instead of NaN
            </h2>
            <div className="mb-4">
              <label className="mb-2 block font-medium text-gray-600">
                Invalid Value:
              </label>
              <input
                type="text"
                value={invalidValue}
                onChange={(e) => {
                  setInvalidValue(e.target.value);
                }}
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p>
              <span className="font-medium text-gray-600">Number:</span>{' '}
              {numberFromInvalid}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
