import React from 'react';
import { useMin } from './useMin';

const UseMinDemo = () => {
  const [num1, setNum1] = React.useState(5);
  const [num2, setNum2] = React.useState(10);
  const minNum = useMin(num1, num2);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">useMin Demo</h1>
      <div className="flex items-center mb-4">
        <label className="mr-2">Enter a number:</label>
        <input
          type="number"
          value={num1}
          onChange={e => setNum1(parseInt(e.target.value, 10))}
          max={10}
          min={-10}
          className="mr-2"
        />
        <label>Minimum value:</label>
        <p className="text-2xl font-bold mb-4">{minNum}</p>
      </div>
      <div className="flex items-center">
        <label className="mr-2">Enter another number:</label>
        <input
          type="number"
          value={num2}
          onChange={e => setNum2(parseInt(e.target.value, 10))}
          max={10}
          min={-10}
          className="mr-2"
        />
        <label>Minimum value:</label>
        <p className="text-2xl font-bold">{minNum}</p>
      </div>
    </div>
  );
};

export default UseMinDemo;
