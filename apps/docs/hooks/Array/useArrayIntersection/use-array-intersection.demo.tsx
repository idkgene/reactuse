'use client';

import { useState } from 'react';
import { useArrayIntersection } from './use-array-intersection';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function ArrayIntersectionDemo(): JSX.Element {
  const [array1, setArray1] = useState('1, 2, 3, 4, 5');
  const [array2, setArray2] = useState('2, 4, 6, 8');
  const [array3, setArray3] = useState('1, 2, 4, 8');

  const parsedArray1 = array1.split(',').map((item) => item.trim());
  const parsedArray2 = array2.split(',').map((item) => item.trim());
  const parsedArray3 = array3.split(',').map((item) => item.trim());

  const intersectionArray = useArrayIntersection(
    parsedArray1,
    parsedArray2,
    parsedArray3,
  );

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="array1" className="block text-sm font-medium">
          Array 1:
        </Label>
        <Input
          id="array1"
          disabled
          aria-disabled
          value={array1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setArray1(e.target.value);
          }}
        />
      </div>
      <div>
        <Label htmlFor="array2" className="block text-sm font-medium">
          Array 2:
        </Label>
        <Input
          id="array2"
          disabled
          aria-disabled
          value={array2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setArray2(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="array3" className="block text-sm font-medium">
          Array 3:
        </label>
        <Input
          id="array3"
          disabled
          aria-disabled
          value={array3}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setArray3(e.target.value);
          }}
        />
      </div>
      <div>
        <p className="text-sm font-medium">Intersection Array:</p>
        <div className="bg-secondary rounded-md">
          <pre>{JSON.stringify(intersectionArray, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default ArrayIntersectionDemo;
