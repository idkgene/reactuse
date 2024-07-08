'use client';
import React from 'react';
import { useProjection } from './use-projection';

const UseProjectionDemo: React.FC = () => {
  const projectedValue = useProjection(5, [0, 10], [0, 100]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">Projected Value:</h1>
      <h2 className="text-6xl font-bold">{projectedValue}</h2>
    </div>
  );
};

export default UseProjectionDemo;
