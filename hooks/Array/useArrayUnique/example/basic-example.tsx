import { useArrayUnique } from '../useArrayUnique';
import * as React from 'react';

const Component = () => {
  const [items, setItems] = React.useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 1, name: 'Alice' }, // Duplicate ID
    { id: 3, name: 'Charlie' },
  ]);

  const uniqueItems = useArrayUnique(items, (a, b) => a.id === b.id);

  return (
    <ul>
      {uniqueItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

export default Component;
