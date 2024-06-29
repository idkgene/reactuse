'use client';

import { useState } from 'react';
import { useArraySome } from './use-array-some';

export default function ArraySomeDemo() {
  const [inputValue, setInputValue] = useState('');
  const [predicateFunction, setPredicateFunction] =
    useState('(item) => item > 5');
  const items = inputValue.split(',').map((item) => parseInt(item.trim(), 10));
  const hasSomeMatch = useArraySome(items, (item) => {
    try {
      const func = eval(predicateFunction);
      return func(item);
    } catch (error) {
      return false;
    }
  });

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
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="predicateFunction" className="mb-2 block">
          Enter predicate function:
        </label>
        <input
          id="predicateFunction"
          type="text"
          value={predicateFunction}
          onChange={(e) => {
            setPredicateFunction(e.target.value);
          }}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
        />
      </div>
      <div>
        <p>Result:</p>
        <p>
          {hasSomeMatch
            ? 'At least one element matches the predicate'
            : 'No elements match the predicate'}
        </p>
      </div>
    </div>
  );
}
