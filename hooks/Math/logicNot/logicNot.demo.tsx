import React from 'react';
import { logicNot } from './logicNot';

const LogicNotDemo = () => {
  const [value, setValue] = React.useState(true);

  const notResult = logicNot(value);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Logic Not Demo</h1>
      <div className="flex items-center mb-4">
        <label className="mr-2">Input:</label>
        <input
          type="checkbox"
          checked={value}
          onChange={e => setValue(e.target.checked)}
          className="mr-2"
        />
      </div>
      <p className="text-2xl font-bold mb-4">
        NOT Result: {notResult.toString()}
      </p>
    </div>
  );
};

export default LogicNotDemo;
