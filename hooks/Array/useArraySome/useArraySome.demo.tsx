'use client';

import { useState } from 'react';

import { useArraySome } from './useArraySome';

export default function ArraySomeDemo() {
  const [inputValue, setInputValue] = useState('');
  const [predicateFunction, setPredicateFunction] =
    useState('(item) => item > 5');
  const items = inputValue.split(',').map(item => parseInt(item.trim(), 10));
  const hasSomeMatch = useArraySome(items, item => {
    try {
      const func = eval(predicateFunction);
      return func(item);
    } catch (error) {
      return false;
    }
  });

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
      <div className="mb-6">
        <label htmlFor="predicateFunction" className="block mb-2">
          Enter predicate function:
        </label>
        <input
          id="predicateFunction"
          type="text"
          value={predicateFunction}
          onChange={e => setPredicateFunction(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
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
