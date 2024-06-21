import * as React from 'react';
import { useArrayWatcher } from '../watchArray';

const Component = () => {
  const [list, setList] = React.useState([1, 2, 3, 4]);

  const handleArrayChange = (
    newArray: number[],
    oldArray: number[],
    added: number[],
    removed: number[]
  ) => {
    console.log('New Array:', newArray);
    console.log('Old Array:', oldArray);
    console.log('Added:', added);
    console.log('Removed:', removed);
  };

  useArrayWatcher(list, handleArrayChange);

  const addElement = () => setList([...list, list.length + 1]);
  const removeElement = () => setList(list.slice(0, -1));

  return (
    <div>
      <p>List: {JSON.stringify(list)}</p>
      <button onClick={addElement}>Add Element</button>
      <button onClick={removeElement}>Remove Element</button>
    </div>
  );
};

export default Component;
