'use client';
import React from 'react';
import { useProjection } from './useProjection';
import Demo from '@/components/Common/Demo/demo';

const UseProjectionDemo: React.FC = () => {
  const projectedValue = useProjection(5, [0, 10], [0, 100]);

  return (
    <Demo href="#">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Projected Value:</h1>
        <h2 className="text-6xl font-bold">{projectedValue}</h2>
      </div>
    </Demo>
  );
};

export default UseProjectionDemo;
