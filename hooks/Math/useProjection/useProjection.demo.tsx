'use client';
import React from 'react';
import { useProjection } from './useProjection';

const UseProjectionDemo: React.FC = () => {
  const projectedValue = useProjection(5, [0, 10], [0, 100]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Projected Value:</h1>
      <h2 className="text-6xl font-bold">{projectedValue}</h2>
    </div>
  );
};

export default UseProjectionDemo;
