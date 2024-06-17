'use client';

import { useWindowResize } from './useWindowResize';

export default function WindowResizeDemo() {
  const { innerWidth, innerHeight, outerWidth, outerHeight } =
    useWindowResize();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-2xl w-full p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">useWindowResize Demo</h1>
        <p className="text-lg mb-8">
          Resize your browser window to see the dimensions update in real-time.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Inner Dimensions</h2>
            <p className="text-4xl font-bold">
              {innerWidth} x {innerHeight}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Outer Dimensions</h2>
            <p className="text-4xl font-bold">
              {outerWidth} x {outerHeight}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
