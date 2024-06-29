'use client';

import { useFps } from './use-fps';

function FpsDemo() {
  const onFpsUpdate = (fps: number) => {
    console.log(`Current FPS: ${fps}`);
  };

  const fps = useFps({ interval: 500, onFpsUpdate });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-gray-800">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">FPS Monitor</h1>
        <div className="text-center">
          <p className="text-lg">Current FPS:</p>
          <p className="text-4xl font-bold">{fps}</p>
        </div>
      </div>
    </div>
  );
}

export default FpsDemo;
