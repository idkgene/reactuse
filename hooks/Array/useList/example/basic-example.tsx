import { useList } from '../useList';
import * as React from 'react';

const Component = () => {
  const [list, { set, push, removeAt, insertAt, updateAt, clear }] = useList([
    1, 2, 3,
  ]);

  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={() => push(4)}>Push</button>
      <button onClick={() => removeAt(1)}>Remove at index 1</button>
      <button onClick={() => insertAt(1, 5)}>Insert 5 at index 1</button>
      <button onClick={() => updateAt(0, 6)}>Update index 0 to 6</button>
      <button onClick={() => set([7, 8, 9])}>Set new list</button>
      <button onClick={clear}>Clear</button>
    </div>
  );
};

export default Component;
