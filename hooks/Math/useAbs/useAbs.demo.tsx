'use client';
import React from 'react';
import { useAbs } from './useAbs';
import Demo from '../../../components/Common/Demo/demo';

const UseAbsDemo = () => {
  const [num, setNum] = React.useState(-10);
  const absNum = useAbs(num);

  return (
    <Demo href="#">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">useAbs Demo</h1>
        <div className="flex items-center mb-4">
          <label className="mr-2">Enter a number:</label>
          <input
            type="number"
            value={num}
            onChange={e => setNum(parseInt(e.target.value, 10))}
            max={10}
            min={-10}
            className="mr-2"
          />
          <label>Absolute value:</label>
          <p className="text-2xl font-bold mb-4">{absNum}</p>
        </div>
      </div>
    </Demo>
  );
};

export default UseAbsDemo;
