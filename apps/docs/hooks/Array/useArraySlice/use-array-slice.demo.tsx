'use client';

import { useState } from 'react';
import { useArraySlice } from './use-array-slice';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function ArraySliceDemo(): JSX.Element {
  const [initialArray, setInitialArray] = useState<string[]>([
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
  ]);
  const { array, slice, reset } = useArraySlice(initialArray);
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [newItem, setNewItem] = useState<string>('');

  const handleSlice = (): void => {
    const startIndex = start ? parseInt(start) : undefined;
    const endIndex = end ? parseInt(end) : undefined;
    slice(startIndex, endIndex);
  };

  const handleReset = (): void => {
    reset();
    setStart('');
    setEnd('');
  };

  const handleAddItem = (): void => {
    if (newItem) {
      setInitialArray((prev) => [...prev, newItem]);
      setNewItem('');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="block text-sm font-medium">Initial Array:</Label>
        <pre className="bg-secondary rounded-md p-2 text-xs">
          {JSON.stringify(initialArray, null, 2)}
        </pre>
      </div>
      <div>
        <Label className="block text-sm font-medium">Current Array:</Label>
        <pre className="bg-secondary rounded-md p-2 text-xs">
          {JSON.stringify(array, null, 2)}
        </pre>
      </div>
      <div className="flex items-center space-x-2">
        <Input
          type="number"
          value={start}
          onChange={(e) => {
            setStart(e.target.value);
          }}
          placeholder="Start index"
        />
        <Input
          type="number"
          value={end}
          onChange={(e) => {
            setEnd(e.target.value);
          }}
          placeholder="End index"
        />
        <Button onClick={handleSlice}>Slice</Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          value={newItem}
          onChange={(e) => {
            setNewItem(e.target.value);
          }}
          placeholder="Add new item"
        />
        <Button onClick={handleAddItem}>Add to Initial</Button>
      </div>
    </div>
  );
}

export default ArraySliceDemo;
