'use client';

import { useState } from 'react';
import { useArrayChunk } from './use-array-chunk';
import { Input } from '@/components/ui/input';
import Demo from '@/components/Common/Demo/demo';

function ArrayChunkDemo(): JSX.Element {
  const [inputArray, setInputArray] = useState('1, 2, 3, 4, 5');
  const [chunkSize, setChunkSize] = useState(2);

  const parsedArray = inputArray.split(',').map((item) => item.trim());
  const chunkedArray = useArrayChunk(parsedArray, chunkSize);

  return (
    <Demo title="useArrayChunk" category="Array">
      <div>
        <label htmlFor="inputArray" className="block text-sm font-medium">
          Input Array:
        </label>
        <Input
          id="inputArray"
          value={inputArray}
          disabled
          aria-disabled
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputArray(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="chunkSize" className="block text-sm font-medium">
          Chunk Size:
        </label>
        <Input
          id="chunkSize"
          type="number"
          value={chunkSize}
          disabled
          aria-disabled
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setChunkSize(parseInt(e.target.value));
          }}
        />
      </div>
      <div>
        <p className="text-sm font-medium">Chunked Array:</p>
        <pre className="mt-2 rounded-md p-4">
          {JSON.stringify(chunkedArray, null, 2)}
        </pre>
      </div>
    </Demo>
  );
}

export default ArrayChunkDemo;
