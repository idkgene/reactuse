'use client';

import { useState, useEffect } from 'react';
import { useSupported } from './use-supported';

export default function UseSupportedDemo() {
  const [isMounted, setIsMounted] = useState(false);

  const isLocalStorageSupported = useSupported(() => 'localStorage' in window);

  const isSessionStorageSupported = useSupported(
    () => 'sessionStorage' in window,
  );

  const isGeolocationSupported = useSupported(() => 'geolocation' in navigator);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="container mx-auto p-8">
      <div className="space-y-6">
        <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Feature Support Check</h2>
          <p>
            <span className="font-medium text-gray-600">
              Local Storage Supported:
            </span>{' '}
            {String(isLocalStorageSupported)}
          </p>
          <p>
            <span className="font-medium text-gray-600">
              Session Storage Supported:
            </span>{' '}
            {String(isSessionStorageSupported)}
          </p>
          <p>
            <span className="font-medium text-gray-600">
              Geolocation Supported:
            </span>{' '}
            {String(isGeolocationSupported)}
          </p>
        </section>
      </div>
    </div>
  );
}
