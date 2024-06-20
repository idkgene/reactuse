'use client';

import { useState } from 'react';

import { useArrayReduce } from '../useArrayReduce';

export default function ArrayReduceDemo() {
  const [inputValue, setInputValue] = useState('');
  const [reducerFunction, setReducerFunction] = useState(
    '(acc, item) => acc + item'
  );
  const [initialValue, setInitialValue] = useState('0');
  const items = inputValue.split(',').map(item => parseInt(item.trim(), 10));
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
    parseInt(initialValue, 10)
  );

  return (
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
      <div className="mb-4">
        <label htmlFor="input" className="block mb-2">
          Enter numbers (comma-separated):
        </label>
        <input
          id="input"
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="reducerFunction" className="block mb-2">
          Enter reducer function:
        </label>
        <input
          id="reducerFunction"
          type="text"
          value={reducerFunction}
          onChange={e => setReducerFunction(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="initialValue" className="block  mb-2">
          Enter initial value:
        </label>
        <input
          id="initialValue"
          type="text"
          value={initialValue}
          onChange={e => setInitialValue(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <p>Reduced value: {reducedValue}</p>
      </div>
    </div>
  );
}
