'use client';

import { useState } from 'react';
import { useArrayCopyWithin } from './use-array-copy-within';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

function ArrayCopyWithinDemo(): JSX.Element {
  const [initialArray, setInitialArray] = useState('1, 2, 3, 4, 5');
  const [target, setTarget] = useState('0');
  const [start, setStart] = useState('2');
  const [end, setEnd] = useState('4');

  const parsedArray = initialArray.split(',').map((item) => item.trim());
  const { array, copyWithin } = useArrayCopyWithin(parsedArray);

  const handleCopyWithin = (): void => {
    copyWithin(Number(target), Number(start), Number(end) || undefined);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="initialArray" className="block text-sm font-medium">
          Initial Array:
        </Label>
        <Input
          id="initialArray"
          value={initialArray}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInitialArray(e.target.value);
          }}
        />
      </div>
      <div>
        <Label htmlFor="target" className="block text-sm font-medium">
          Target:
        </Label>
        <Input
          id="target"
          value={target}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTarget(e.target.value);
          }}
        />
      </div>
      <div>
        <Label htmlFor="start" className="block text-sm font-medium">
          Start:
        </Label>
        <Input
          id="start"
          value={start}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setStart(e.target.value);
          }}
        />
      </div>
      <div>
        <Label htmlFor="end" className="block text-sm font-medium">
          End:
        </Label>
        <Input
          id="end"
          value={end}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEnd(e.target.value);
          }}
        />
      </div>
      <Button onClick={handleCopyWithin}>Copy Within</Button>
      <div>
        <p className="text-sm font-medium">Result Array:</p>
        <div className="bg-secondary rounded-md">
          <pre>{JSON.stringify(array, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default ArrayCopyWithinDemo;
