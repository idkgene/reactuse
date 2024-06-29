import React from 'react';
import { logicAnd } from './logicAnd';

function LogicAndDemo() {
  const [value1, setValue1] = React.useState(true);
  const [value2, setValue2] = React.useState(true);
  const [value3, setValue3] = React.useState(true);

  const andResult = logicAnd(value1, value2, value3);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">Logic And Demo</h1>
      <div className="mb-4 flex items-center">
        <label className="mr-2">Input 1:</label>
        <input
          type="checkbox"
          checked={value1}
          onChange={(e) => { setValue1(e.target.checked); }}
          className="mr-2"
        />
        <label>Input 2:</label>
        <input
          type="checkbox"
          checked={value2}
          onChange={(e) => { setValue2(e.target.checked); }}
          className="mr-2"
        />
        <label>Input 3:</label>
        <input
          type="checkbox"
          checked={value3}
          onChange={(e) => { setValue3(e.target.checked); }}
          className="mr-2"
        />
      </div>
      <p className="mb-4 text-2xl font-bold">
        AND Result: {andResult.toString()}
      </p>
    </div>
  );
}

export default LogicAndDemo;
