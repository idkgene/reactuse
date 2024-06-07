'use client';
import { useState } from 'react';
import { useArrayUnique } from '../../hooks/Array/useArrayUnique';

const objects = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 1, name: 'Apple' },
  { id: 3, name: 'Cherry' },
];

const ArrayUniqueDemo = () => {
  const [inputArray, setInputArray] = useState(objects);
  const [useCustomComparator, setUseCustomComparator] = useState(false);
  const uniqueItems = useArrayUnique(
    inputArray,
    useCustomComparator ? (a, b) => a.id === b.id : undefined
  );

  const handleInputChange = (
    index: number,
    field: 'id' | 'name',
    value: string
  ) => {
    setInputArray(prevArray => {
      const newArray = [...prevArray];
      newArray[index] = { ...newArray[index], [field]: value };
      return newArray;
    });
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <label
          htmlFor="customComparator"
          className="inline-flex items-center space-x-2 cursor-pointer"
        >
          <input
            id="customComparator"
            type="checkbox"
            className="form-checkbox rounded-md h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            checked={useCustomComparator}
            onChange={() => setUseCustomComparator(!useCustomComparator)}
          />
          <span className="text-gray-700">
            Use Custom Comparator (compare by ID)
          </span>
        </label>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          Input Array:
        </h3>
        <ul className="list-decimal pl-6 space-y-2">
          {inputArray.map((item, index) => (
            <li key={index} className="flex items-center space-x-4">
              <input
                type="text"
                className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={item.id}
                onChange={e => handleInputChange(index, 'id', e.target.value)}
              />
              <input
                type="text"
                className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={item.name}
                onChange={e => handleInputChange(index, 'name', e.target.value)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          Unique Items:
        </h3>
        <pre className="bg-gray-100 rounded-md p-4 text-sm">
          {JSON.stringify(uniqueItems, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ArrayUniqueDemo;
