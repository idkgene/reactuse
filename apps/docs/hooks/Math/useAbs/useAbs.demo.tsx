'use client';
import React from 'react';
import { useAbs } from './useAbs';

function UseAbsDemo() {
  const [num, setNum] = React.useState(-10);
  const absNum = useAbs(num);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">useAbs Demo</h1>
      <div className="mb-4 flex items-center">
        <label className="mr-2">Enter a number:</label>
        <input
          type="number"
          value={num}
          onChange={(e) => { setNum(parseInt(e.target.value, 10)); }}
          max={10}
          min={-10}
          className="mr-2"
        />
        <label>Absolute value:</label>
        <p className="mb-4 text-2xl font-bold">{absNum}</p>
      </div>
    </div>
  );
}

export default UseAbsDemo;
