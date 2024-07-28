'use client';

import { useState } from 'react';
import { useArrayChunk } from './use-array-chunk';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function ArrayChunkDemo(): JSX.Element {
  const [inputArray, setInputArray] = useState('1, 2, 3, 4, 5');
  const [chunkSize, setChunkSize] = useState(2);

  const parsedArray = inputArray.split(',').map((item) => item.trim());
  const chunkedArray = useArrayChunk(parsedArray, chunkSize);

  return (
    <div className="flex flex-col">
      <div>
        <Label htmlFor="inputArray">Input Array:</Label>
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
        <Label htmlFor="chunkSize">Chunk Size:</Label>
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
        <div className="bg-secondary rounded-md">
          <pre>{JSON.stringify(chunkedArray, null, 0)}</pre>
        </div>
      </div>
    </div>
  );
}

export default ArrayChunkDemo;
