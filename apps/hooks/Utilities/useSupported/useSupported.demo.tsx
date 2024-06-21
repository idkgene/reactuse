'use client';

import { useState, useEffect } from 'react';
import { useSupported } from './useSupported';

export default function UseSupportedDemo() {
  const [isMounted, setIsMounted] = useState(false);

  const isLocalStorageSupported = useSupported(() => 'localStorage' in window);

  const isSessionStorageSupported = useSupported(
    () => 'sessionStorage' in window
  );

  const isGeolocationSupported = useSupported(() => 'geolocation' in navigator);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="container mx-auto p-8">
      <div className="space-y-6">
        <section className="p-4 bg-white shadow-sm rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Feature Support Check</h2>
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
