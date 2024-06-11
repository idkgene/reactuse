import useArrayJoin from '../useArrayJoin';
import * as React from 'react';

const Component = () => {
  const [numbers, setNumbers] = React.useState([1, 2, 3]);

  const joinedNumbers = useArrayJoin(numbers, '-');

  return (
    <div>
      <p>Joined Numbers: {joinedNumbers}</p>
    </div>
  );
};

export default Component;