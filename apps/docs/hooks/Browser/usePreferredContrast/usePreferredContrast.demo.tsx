'use client';

import { useState } from 'react';
import { usePreferredContrast } from './usePreferredContast';

export default function PreferredContrastDemo() {
  const preferredContrast = usePreferredContrast();
  const [contrast, setContrast] = useState(preferredContrast);

  const toggleContrast = (
    contrast: 'more' | 'less' | 'custom' | 'no-preference',
  ) => {
    setContrast(contrast);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-6 sm:py-12">
      <div className="relative py-3 sm:mx-auto sm:max-w-xl">
        <div className="to-light-blue-500 absolute inset-0 -skew-y-6 bg-gradient-to-r from-cyan-400 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl" />
        <div className="relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
          <p className="mb-8 text-xl">
            Your preferred contrast setting is: <strong>{contrast}</strong>
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className={`rounded-md px-4 py-2 text-white ${
                contrast === 'more' ? 'bg-green-500' : 'bg-gray-500'
              }`}
              onClick={() => { toggleContrast('more'); }}
            >
              More Contrast
            </button>
            <button
              className={`rounded-md px-4 py-2 text-white ${
                contrast === 'less' ? 'bg-green-500' : 'bg-gray-500'
              }`}
              onClick={() => { toggleContrast('less'); }}
            >
              Less Contrast
            </button>
            <button
              className={`rounded-md px-4 py-2 text-white ${
                contrast === 'custom' ? 'bg-green-500' : 'bg-gray-500'
              }`}
              onClick={() => { toggleContrast('custom'); }}
            >
              Custom Contrast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
