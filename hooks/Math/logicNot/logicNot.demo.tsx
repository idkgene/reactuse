import React from 'react';
import { logicNot } from './logicNot';
import Demo from '../../../components/Common/Demo/demo';

const LogicNotDemo = () => {
  const [value, setValue] = React.useState(true);

  const notResult = logicNot(value);

  return (
    <Demo href="#">
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

    </Demo>
  );
};

export default LogicNotDemo;
