'use client';
import React, { useEffect, useState } from 'react';
import { useArraySome } from '../../hooks/Array/useArraySome/useArraySome';

const MAX_NUMBERS = 5;

const ArraySomeDemo = () => {
  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    const randomNumbers = Array.from({ length: MAX_NUMBERS }, () =>
      Math.floor(Math.random() * 100)
    );
    setNumbers(randomNumbers);
  }, []);

  const hasEvenNumber = useArraySome(numbers, number => number % 2 === 0);

  const addNumber = (newNumber: number) => {
    const updatedNumbers = [...numbers, newNumber].slice(-MAX_NUMBERS);
    setNumbers(updatedNumbers);
  };

  const resetNumbers = () => {
    setNumbers([]);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Numbers:</h2>
        <ul className="list-disc list-inside h-[320px]">
          {numbers.map((number, index) => (
            <li key={index}>{number}</li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-4 mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => addNumber(Math.floor(Math.random() * 10))}
        >
          Add Random Number
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={resetNumbers}
        >
          Reset
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
