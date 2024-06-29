'use client';

import { useWindowResize } from './useWindowResize';

export default function WindowResizeDemo() {
  const { innerWidth, innerHeight, outerWidth, outerHeight } =
    useWindowResize();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-2xl rounded-lg bg-gray-800 p-6 shadow-lg">
        <h1 className="mb-4 text-4xl font-bold">useWindowResize Demo</h1>
        <p className="mb-8 text-lg">
          Resize your browser window to see the dimensions update in real-time.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-gray-700 p-4">
            <h2 className="mb-2 text-xl font-semibold">Inner Dimensions</h2>
            <p className="text-4xl font-bold">
              {innerWidth} x {innerHeight}
            </p>
          </div>
          <div className="rounded-lg bg-gray-700 p-4">
            <h2 className="mb-2 text-xl font-semibold">Outer Dimensions</h2>
            <p className="text-4xl font-bold">
              {outerWidth} x {outerHeight}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
