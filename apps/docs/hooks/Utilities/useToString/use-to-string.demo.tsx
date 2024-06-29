'use client';

import { useState, useEffect } from 'react';
import { useToString } from './use-to-string';

export default function UseToStringDemo(): JSX.Element | null {
  const [date, setDate] = useState(new Date());
  const dateAsString = useToString(() => date.toLocaleString());

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updateDate = (): void => {
    setDate(new Date());
  };

  if (!isMounted) return null;

  return (
    <div className="not-prose container mx-auto p-8">
      <div className="space-y-6">
        <section className="rounded-lg border p-4 shadow-sm">
          <div className="px-4">
            <p className="mb-1">
              <span className="font-medium text-gray-600">Date:</span>{' '}
              {date.toLocaleString()}
            </p>
            <p className="!mt-[none] mb-1">
              <span className="font-medium text-gray-600">String:</span>{' '}
              {dateAsString}
            </p>
            <button
              onClick={updateDate}
              type="button"
              className="rounded-md border px-4 py-2 transition-colors hover:bg-accent disabled:text-muted-foreground"
            >
              Update Date
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
