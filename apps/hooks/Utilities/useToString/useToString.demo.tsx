'use client';

import { useState, useEffect } from 'react';
import { useToString } from './useToString';

export default function UseToStringDemo() {
  const [date, setDate] = useState(new Date());
  const dateAsString = useToString(() => date.toLocaleString());

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updateDate = () => setDate(new Date());

  if (!isMounted) return null;

  return (
    <div className="not-prose container mx-auto p-8">
      <div className="space-y-6">
        <section className="p-4 shadow-sm rounded-lg border">
          <div className="px-4">
            <p className="mb-1">
              <span className="font-medium text-gray-600">Date:</span>{' '}
              {date.toLocaleString()}
            </p>
            <p className="mb-1 !mt-[none]">
              <span className="font-medium text-gray-600">String:</span>{' '}
              {dateAsString}
            </p>
            <button
              onClick={updateDate}
              className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:text-muted-foreground hover:bg-accent transition-colors"
            >
              Update Date
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
