import React from 'react';
import { useArrayJoin } from './useArrayJoin';

const useArrayJoinDemo = () => {
  const list = [1, 2, 3, 4, 5];
  const joinedList = useArrayJoin(list);

  return (
    <div>
      <p>Original array: {list.join(', ')}</p>
      <p>Joined array: {joinedList}</p>
    </div>
  );
};

export default useArrayJoinDemo;
