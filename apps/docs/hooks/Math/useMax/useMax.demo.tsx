import React from 'react';
import { useMax } from './useMax';

function UseMaxDemo() {
  const [num1, setNum1] = React.useState(5);
  const [num2, setNum2] = React.useState(10);
  const maxNum = useMax(num1, num2);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">useMax Demo</h1>
      <div className="mb-4 flex items-center">
        <label className="mr-2">Enter a number:</label>
        <input
          type="number"
          value={num1}
          onChange={(e) => { setNum1(parseInt(e.target.value, 10)); }}
          max={10}
          min={-10}
          className="mr-2"
        />
        <label>Maximum value:</label>
        <p className="mb-4 text-2xl font-bold">{maxNum}</p>
      </div>
      <div className="flex items-center">
        <label className="mr-2">Enter another number:</label>
        <input
          type="number"
          value={num2}
          onChange={(e) => { setNum2(parseInt(e.target.value, 10)); }}
          max={10}
          min={-10}
          className="mr-2"
        />
        <label>Maximum value:</label>
        <p className="text-2xl font-bold">{maxNum}</p>
      </div>
    </div>
  );
}

export default UseMaxDemo;
