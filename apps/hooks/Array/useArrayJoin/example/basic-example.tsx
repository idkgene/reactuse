import { useArrayJoin } from '../useArrayJoin';
import * as React from 'react';

const Component = () => {
  const [words, setWords] = React.useState(['hello', 'world']);

  const joinedWords = useArrayJoin(words, ' ');

  return (
    <div>
      <p>Joined Words: {joinedWords}</p>
    </div>
  );
};

export default Component;
