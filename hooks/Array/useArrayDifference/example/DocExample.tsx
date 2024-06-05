import React from 'react';
import { useArrayDifference } from '../useArrayDifference';
import '@/app/globals.css';

const ExampleDemo = () => {
  const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  const values = [{ id: 4 }, { id: 5 }, { id: 6 }];

  const result1 = useArrayDifference(list, values, 'id');
  const result2 = useArrayDifference(
    list,
    values,
    (item, othItem) => item.id === othItem.id
  );

  return (
    <div>
      <h2>Result 1:</h2>
      <ul>
        {result1.map(item => (
          <li key={item.id}>{JSON.stringify(item)}</li>
        ))}
      </ul>

      <h2>Result 2:</h2>
      <ul>
        {result2.map(item => (
          <li key={item.id}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExampleDemo;
