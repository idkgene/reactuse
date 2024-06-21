'use client';

import { useFps } from './useFps';

const FpsDemo = () => {
  const onFpsUpdate = (fps: number) => {
    console.log(`Current FPS: ${fps}`);
  };

  const fps = useFps({ interval: 500, onFpsUpdate });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">FPS Monitor</h1>
        <div className="text-center">
          <p className="text-lg">Current FPS:</p>
          <p className="text-4xl font-bold">{fps}</p>
        </div>
      </div>
    </div>
  );
};

export default FpsDemo;
