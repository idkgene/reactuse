import React from 'react';
import { useDefault } from './useDefault';

export const UseDefaultDemo = () => {
  const [state, setState] = useDefault('Default Value');
  const [newValue, setNewValue] = React.useState('');

  const handleReset = () => {
    setState(null);
  };

  const handleUpdate = () => {
    setState(newValue);
  };

  return (
    <div>
      <p>Current State: {state}</p>
      <input type="text" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};