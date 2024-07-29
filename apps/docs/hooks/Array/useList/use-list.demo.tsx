'use client';

import { useState } from 'react';
import { useList } from './use-list';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function UseListDemo(): JSX.Element {
  const [list, actions] = useList<string>(['Apple', 'Banana', 'Cherry']);
  const [inputValue, setInputValue] = useState('');
  const [indexInput, setIndexInput] = useState('');

  return (
    <div className="space-y-4">
      <div>
        <Label className="block text-sm font-medium">Current List:</Label>
        <pre className="bg-secondary rounded-md p-2 text-xs">
          {JSON.stringify(list, null, 2)}
        </pre>
      </div>

      <div className="space-y-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
          }}
          placeholder="Enter a value"
        />
        <Input
          type="number"
          value={indexInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIndexInput(e.target.value);
          }}
          placeholder="Enter an index"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => {
            actions.push(inputValue);
          }}
        >
          Push
        </Button>
        <Button onClick={() => actions.pop()}>Pop</Button>
        <Button
          onClick={() => {
            actions.unshift(inputValue);
          }}
        >
          Unshift
        </Button>
        <Button onClick={() => actions.shift()}>Shift</Button>
        <Button
          onClick={() => {
            actions.insertAt(Number(indexInput), inputValue);
          }}
        >
          Insert At
        </Button>
        <Button onClick={() => actions.removeAt(Number(indexInput))}>
          Remove At
        </Button>
        <Button
          onClick={() => {
            actions.updateAt(Number(indexInput), inputValue);
          }}
        >
          Update At
        </Button>
        <Button
          onClick={() => {
            actions.clear();
          }}
        >
          Clear
        </Button>
        <Button
          onClick={() => {
            actions.filter((item) => item.length > 5);
          }}
        >
          Filter (length &gt; 5)
        </Button>
        <Button
          onClick={() => {
            actions.sort();
          }}
        >
          Sort
        </Button>
        <Button
          onClick={() => {
            actions.reverse();
          }}
        >
          Reverse
        </Button>
      </div>
    </div>
  );
}

export default UseListDemo;
