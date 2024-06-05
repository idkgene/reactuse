'use client';
import { useList } from './useList';

const UseListDemo = () => {
  const [list, { set, push, removeAt, insertAt, updateAt, clear }] = useList([
    1, 2, 3,
  ]);

  const handleAddItem = () => {
    const newItem = list.length + 1;
    push(newItem);
  };

  const handleRemoveItem = (index: number) => {
    removeAt(index);
  };

  const handleInsertItem = (index: number) => {
    const newItem = list.length + 1;
    insertAt(index, newItem);
  };

  const handleUpdateItem = (index: number) => {
    const newItem = list[index] * 2;
    updateAt(index, newItem);
  };

  const handleClearList = () => {
    set([]);
  };

  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => handleRemoveItem(index)}>Remove</button>
            <button onClick={() => handleInsertItem(index)}>Insert</button>
            <button onClick={() => handleUpdateItem(index)}>Update</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddItem}>Add Item</button>
      <button onClick={handleClearList}>Set to empty array</button>
    </div>
  );
};

export default UseListDemo;
