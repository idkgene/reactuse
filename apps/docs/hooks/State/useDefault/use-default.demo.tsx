'use client';

import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useDefault } from './use-default';

export default function UseDefaultDemo() {
  const [state, setState] = useDefault('Default Value');
  const [newValue, setNewValue] = useState('');

  const handleReset = () => {
    setState(null);
  };

  const handleUpdate = () => {
    setState(newValue);
  };

  return (
    <div>
      <p>Current State: {state}</p>
      <Input
        type="text"
        value={newValue}
        placeholder="New Value"
        className="mb-3"
        onChange={(e) => {
          setNewValue(e.target.value);
        }}
      />
      <div className="flex gap-3">
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={handleUpdate}>Update</Button>
      </div>
    </div>
  );
}
