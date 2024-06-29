'use client';

import { useState } from 'react';
import { useArrayReduce } from '.';

export default function ArrayReduceDemo() {
  const [inputValue, setInputValue] = useState('');
  const [reducerFunction, setReducerFunction] = useState(
    '(acc, item) => acc + item',
  );
  const [initialValue, setInitialValue] = useState('0');
  const items = inputValue.split(',').map((item) => parseInt(item.trim(), 10));
  const reducedValue = useArrayReduce(
    items,
    (acc, item) => {
      try {
        const func = eval(reducerFunction);
        return func(acc, item);
      } catch (error) {
        return acc;
      }
    },
    parseInt(initialValue, 10),
  );

  return (
    <div className="relative mb-[10px] rounded-lg border p-[2em] transition-colors">
      <div className="mb-4">
        <label htmlFor="input" className="mb-2 block">
          Enter numbers (comma-separated):
        </label>
        <input
          id="input"
          type="text"
          value={inputValue}
          onChange={(e) => { setInputValue(e.target.value); }}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="reducerFunction" className="mb-2 block">
          Enter reducer function:
        </label>
        <input
          id="reducerFunction"
          type="text"
          value={reducerFunction}
          onChange={(e) => { setReducerFunction(e.target.value); }}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="initialValue" className="mb-2  block">
          Enter initial value:
        </label>
        <input
          id="initialValue"
          type="text"
          value={initialValue}
          onChange={(e) => { setInitialValue(e.target.value); }}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
        />
      </div>
      <div>
        <p>Reduced value: {reducedValue}</p>
      </div>
    </div>
  );
}
