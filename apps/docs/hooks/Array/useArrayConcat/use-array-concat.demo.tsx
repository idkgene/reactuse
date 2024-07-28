'use client';

import { useState } from 'react';
import { useArrayConcat } from './use-array-concat';
import { Input } from '@/components/ui/input';
import Demo from '@/components/Common/Demo/demo';

function ArrayConcatDemo(): JSX.Element {
  const [array1, setArray1] = useState('1, 2, 3');
  const [array2, setArray2] = useState('4, 5, 6');

  const parsedArray1 = array1.split(',').map((item) => item.trim());
  const parsedArray2 = array2.split(',').map((item) => item.trim());

  const concatenatedArray = useArrayConcat(parsedArray1, parsedArray2);

  return (
    <Demo title="useArrayConcat" category="Array">
      <div className="space-y-4">
        <div>
          <label htmlFor="array1" className="block text-sm font-medium">
            Array 1:
          </label>
          <Input
            id="array1"
            value={array1}
            disabled
            aria-disabled
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setArray1(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="array2" className="block text-sm font-medium">
            Array 2:
          </label>
          <Input
            id="array2"
            value={array2}
            disabled
            aria-disabled
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setArray2(e.target.value);
            }}
          />
        </div>
        <div>
          <p className="text-sm font-medium">Concatenated Array:</p>
          <pre className="mt-2 rounded-md p-4">
            {JSON.stringify(concatenatedArray, null, 2)}
          </pre>
        </div>
      </div>
    </Demo>
  );
}

export default ArrayConcatDemo;
