import { useRound } from '../useRound';
import * as React from 'react';
 
const Component = () => {
  const [roundedNumber, roundNumber] = useRound();
 
  return (
    <div>
      <p>Rounded number: {roundedNumber}</p>
      <button onClick={() => roundNumber(3.7)}>Round 3.7</button>
      <button onClick={() => roundNumber(2.1)}>Round 2.1</button>
    </div>
  );
};
 
export default Component;