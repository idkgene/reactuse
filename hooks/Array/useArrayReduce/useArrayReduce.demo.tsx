import React, { useMemo, useState } from 'react';

interface ListItem {
  id: number;
  value: number;
}

const UseArrayReduceDemo: React.FC = () => {
  const [list, setList] = useState<ListItem[]>([
    { id: 1, value: 5 },
    { id: 2, value: 10 },
    { id: 3, value: 15 },
  ]);

  const handleAddItem = () => {
    const nextId =
      list.length > 0 ? Math.max(...list.map(item => item.id)) + 1 : 1;
    setList([...list, { id: nextId, value: Math.floor(Math.random() * 100) }]);
  };

  const handleRemoveItem = (id: number) => {
    setList(list.filter(item => item.id !== id));
  };

  const sum = useMemo(() => {
    return list.reduce((acc, item) => acc + item.value, 0);
  }, [list]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddItem}
        >
          Add an element
        </button>
      </div>

      <ul className="list-disc list-inside">
        {list.map(item => (
          <li key={item.id} className="flex items-center justify-between">
            <span>Value: {item.value}</span>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
              onClick={() => handleRemoveItem(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <p className="text-lg font-semibold">Sum of values: {sum}</p>
      </div>
    </div>
  );
};

export default UseArrayReduceDemo;
