'use client';

import { useState, useMemo } from 'react';
import { useArrayChunk } from './use-array-chunk';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

function ArrayChunkDemo(): JSX.Element {
  const [arrayInput, setArrayInput] = useState('1,2,3,4,5,6,7,8,9,10');
  const [chunkSize, setChunkSize] = useState(3);
  const [useGetter, setUseGetter] = useState(false);

  const array = useMemo(() => arrayInput.split(',').map(Number), [arrayInput]);
  const arrayGetter = useMemo(() => () => array, [array]);

  const chunkedArray = useArrayChunk(
    useGetter ? arrayGetter : array,
    chunkSize,
  );

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="arrayInput" className="block text-sm font-medium">
          Input Array (comma-separated):
        </Label>
        <Input
          id="arrayInput"
          value={arrayInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setArrayInput(e.target.value);
          }}
        />
      </div>
      <div>
        <Label htmlFor="chunkSize" className="block text-sm font-medium">
          Chunk Size:
        </Label>
        <Input
          id="chunkSize"
          type="number"
          min={1}
          value={chunkSize}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setChunkSize(Number(e.target.value));
          }}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="useGetter"
          checked={useGetter}
          onCheckedChange={(checked) => {
            setUseGetter(checked as boolean);
          }}
        />
        <Label htmlFor="useGetter" className="text-sm">
          Use Getter Function
        </Label>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="block text-sm font-medium">Original Array:</Label>
          <pre className="bg-secondary rounded-md p-2 text-xs">
            {JSON.stringify(array, null, 2)}
          </pre>
        </div>
        <div>
          <Label className="block text-sm font-medium">Chunked Array:</Label>
          <pre className="bg-secondary rounded-md p-2 text-xs">
            {JSON.stringify(chunkedArray, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default ArrayChunkDemo;
