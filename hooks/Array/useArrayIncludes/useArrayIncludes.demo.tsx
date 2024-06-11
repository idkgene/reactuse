import React, { useState } from 'react';
import { useArrayIncludes } from './useArrayIncludes';

const UseArrayIncludesDemo = () => {
  const [list, setList] = useState([1, 2, 3, 4, 5]);
  const [value, setValue] = useState('');
  const [fromIndex, setFromIndex] = useState(0);
  const [comparator, setComparator] = useState('');

  const includes = useArrayIncludes(list, parseInt(value), {
    fromIndex,
    comparator: comparator
      ? element => element === parseInt(comparator)
      : undefined,
  });

  const handleAddItem = () => {
    const newItem = parseInt(value);
    if (!isNaN(newItem)) {
      setList([...list, newItem]);
      setValue('');
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedList = [...list];
    updatedList.splice(index, 1);
    setList(updatedList);
  };

  const handleListChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputList = event.target.value
      .split(',')
      .map(item => parseInt(item.trim()));
    setList(inputList);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">useArrayIncludes Demo</h1>
      <div className="mb-4">
        <label htmlFor="value" className="block text-gray-700 font-bold mb-2">
          Add item to the array:
        </label>
        <div className="flex">
          <input
            type="text"
            id="value"
            value={value}
            onChange={e => setValue(e.target.value)}
            className="flex-grow px-3 py-2 text-gray-700 border rounded-l-lg focus:outline-none"
            placeholder="Enter a number"
          />
          <button
            onClick={handleAddItem}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none"
          >
            Add
          </button>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Current Array:</h2>
        <ul className="list-disc pl-6">
          {list.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{item}</span>
              <button
                onClick={() => handleRemoveItem(index)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <label
          htmlFor="searchValue"
          className="block text-gray-700 font-bold mb-2"
        >
          Search for a value:
        </label>
        <input
          type="text"
          id="searchValue"
          value={value}
          onChange={e => setValue(e.target.value)}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          placeholder="Enter a value to search"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="fromIndex"
          className="block text-gray-700 font-bold mb-2"
        >
          From index:
        </label>
        <input
          type="number"
          id="fromIndex"
          value={fromIndex}
          onChange={e => setFromIndex(parseInt(e.target.value))}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="comparator"
          className="block text-gray-700 font-bold mb-2"
        >
          Custom comparator:
        </label>
        <input
          type="text"
          id="comparator"
          value={comparator}
          onChange={e => setComparator(e.target.value)}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        />
      </div>
      <div className="text-lg font-bold">
        Result:{' '}
        <span className={`${includes ? 'text-green-500' : 'text-red-500'}`}>
          {includes.toString()}
        </span>
      </div>
    </div>
  );
};

export default UseArrayIncludesDemo;
