import React from 'react';
import { logicAnd } from './logicAnd';
import Demo from '../../../components/Common/Demo/demo';

const LogicAndDemo = () => {
  const [value1, setValue1] = React.useState(true);
  const [value2, setValue2] = React.useState(true);
  const [value3, setValue3] = React.useState(true);

  const andResult = logicAnd(value1, value2, value3);

  return (
    <Demo href="#">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Logic And Demo</h1>
        <div className="flex items-center mb-4">
          <label className="mr-2">Input 1:</label>
          <input
            type="checkbox"
            checked={value1}
            onChange={e => setValue1(e.target.checked)}
            className="mr-2"
          />
          <label>Input 2:</label>
          <input
            type="checkbox"
            checked={value2}
            onChange={e => setValue2(e.target.checked)}
            className="mr-2"
          />
          <label>Input 3:</label>
          <input
            type="checkbox"
            checked={value3}
            onChange={e => setValue3(e.target.checked)}
            className="mr-2"
          />
        </div>
        <p className="text-2xl font-bold mb-4">
          AND Result: {andResult.toString()}
        </p>
      </div>
    </Demo>
  );
};

export default LogicAndDemo;
