import { useRound } from '../useRound';
import * as React from 'react';

const Component = () => {
  const [roundedNumber, roundNumber] = useRound(5);

  return (
    <div>
      <p>Rounded number: {roundedNumber}</p>
      <button onClick={() => roundNumber(7.8)}>Round 7.8</button>
      <button onClick={() => roundNumber(4.2)}>Round 4.2</button>
    </div>
  );
};

export default Component;
