'use client';

import { useState } from 'react';
import { useArrayCopyWithin } from './use-array-copy-within';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

function ArrayCopyWithinDemo(): JSX.Element {
  const [initialArray, setInitialArray] = useState('1,2,3,4,5,6,7,8,9,10');
  const [target, setTarget] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState('');

  const parsedArray = initialArray.split(',').map(Number);
  const { array, copyWithin } = useArrayCopyWithin(parsedArray);

  const handleCopyWithin = (): void => {
    copyWithin(target, start, end === '' ? undefined : Number(end));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="initialArray" className="block text-sm font-medium">
          Initial Array (comma-separated):
        </Label>
        <Input
          id="initialArray"
          value={initialArray}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInitialArray(e.target.value);
          }}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="target" className="block text-sm font-medium">
            Target:
          </Label>
          <Input
            id="target"
            type="number"
            value={target}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTarget(Number(e.target.value));
            }}
          />
        </div>
        <div>
          <Label htmlFor="start" className="block text-sm font-medium">
            Start:
          </Label>
          <Input
            id="start"
            type="number"
            value={start}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setStart(Number(e.target.value));
            }}
          />
        </div>
        <div>
          <Label htmlFor="end" className="block text-sm font-medium">
            End (optional):
          </Label>
          <Input
            id="end"
            type="number"
            value={end}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEnd(e.target.value);
            }}
          />
        </div>
      </div>
      <Button onClick={handleCopyWithin}>Copy Within</Button>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="block text-sm font-medium">Initial Array:</Label>
          <pre className="bg-secondary rounded-md p-2 text-xs">
            {JSON.stringify(parsedArray, null, 2)}
          </pre>
        </div>
        <div>
          <Label className="block text-sm font-medium">Result Array:</Label>
          <pre className="bg-secondary rounded-md p-2 text-xs">
            {JSON.stringify(array, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default ArrayCopyWithinDemo;
