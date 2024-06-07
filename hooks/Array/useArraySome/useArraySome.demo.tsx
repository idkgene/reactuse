'use client';
import React, { useState } from 'react';
import { useArraySome } from './useArraySome';

const ArraySomeDemo = () => {
  const [numbers, setNumbers] = useState([1, 3, 5, 7]);

  const hasEvenNumber = useArraySome(numbers, number => number % 2 === 0);

  const addNumber = newNumber => {
    setNumbers([...numbers, newNumber]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Numbers:</h2>
        <ul className="list-disc list-inside">
          {numbers.map((number, index) => (
            <li key={index}>{number}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => addNumber(numbers[numbers.length - 1] + 1)}
        >
          Add Next Number
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-md">
        <p className="text-lg">
          <strong>Does the array contain an even number?</strong>{' '}
          {hasEvenNumber ? 'Yes' : 'No'}
        </p>
      </div>
    </div>
  );
};

export default ArraySomeDemo;
