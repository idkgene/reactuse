import * as React from 'react';
import { useAverage } from './useAverage';

const UseAverageDemo = () => {
  const [nums, setNums] = React.useState([1, 2, 3, 4, 5]);
  const average = useAverage(...nums);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">useAverage Demo</h1>
        <div className="flex items-center mb-4">
          <label className="mr-2">Enter numbers (comma-separated):</label>
          <input
            type="text"
            value={nums.join(',')}
            onChange={e => setNums(e.target.value.split(',').map(Number))}
            className="mr-2"
            maxLength={10}
          />
          <label>Average:</label>
          <p className="text-xl font-bold">{average}</p>
        </div>
      </div>
    </>
  );
};

export default UseAverageDemo;
