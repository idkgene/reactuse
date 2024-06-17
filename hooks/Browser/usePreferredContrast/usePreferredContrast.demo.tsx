'use client';

import { useState } from 'react';

import { usePreferredContrast } from './usePreferredContast';

export default function PreferredContrastDemo() {
  const preferredContrast = usePreferredContrast();
  const [contrast, setContrast] = useState(preferredContrast);

  const toggleContrast = (
    contrast: 'more' | 'less' | 'custom' | 'no-preference'
  ) => {
    setContrast(contrast);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <p className="text-xl mb-8">
            Your preferred contrast setting is: <strong>{contrast}</strong>
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className={`px-4 py-2 rounded-md text-white ${
                contrast === 'more' ? 'bg-green-500' : 'bg-gray-500'
              }`}
              onClick={() => toggleContrast('more')}
            >
              More Contrast
            </button>
            <button
              className={`px-4 py-2 rounded-md text-white ${
                contrast === 'less' ? 'bg-green-500' : 'bg-gray-500'
              }`}
              onClick={() => toggleContrast('less')}
            >
              Less Contrast
            </button>
            <button
              className={`px-4 py-2 rounded-md text-white ${
                contrast === 'custom' ? 'bg-green-500' : 'bg-gray-500'
              }`}
              onClick={() => toggleContrast('custom')}
            >
              Custom Contrast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
