import React from 'react';
import { logicNot } from './logicNot';

function LogicNotDemo() {
  const [value, setValue] = React.useState(true);

  const notResult = logicNot(value);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">Logic Not Demo</h1>
      <div className="mb-4 flex items-center">
        <label className="mr-2">Input:</label>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => { setValue(e.target.checked); }}
          className="mr-2"
        />
      </div>
      <p className="mb-4 text-2xl font-bold">
        NOT Result: {notResult.toString()}
      </p>
    </div>
  );
}

export default LogicNotDemo;
