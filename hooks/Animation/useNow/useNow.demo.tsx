'use client';

import React, { useEffect, useState } from 'react';
import { useNow } from './useNow';

const UseNowDemo: React.FC = () => {
  const { pause, resume } = useNow({ controls: true, interval: 1000 });
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">useNow Demo</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex justify-center items-center space-x-4">
                  <span className="text-4xl font-bold" suppressHydrationWarning>
                    {now.toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={pause}
                    className="px-4 py-2 rounded-md text-white bg-red-500 focus:outline-none"
                  >
                    Pause
                  </button>
                  <button
                    onClick={resume}
                    className="px-4 py-2 rounded-md text-white bg-green-500 focus:outline-none"
                  >
                    Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseNowDemo;
