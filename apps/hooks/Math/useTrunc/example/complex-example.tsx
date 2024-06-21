import { useTrunc } from '../useTrunc';
import * as React from 'react';
 
const Component = () => {
  const [truncatedNumber, truncateNumber] = useTrunc(5);
 
  return (
    <div>
      <p>Truncated number: {truncatedNumber}</p>
      <button onClick={() => truncateNumber(7.89)}>Truncate 7.89</button>
      <button onClick={() => truncateNumber(4.23)}>Truncate 4.23</button>
    </div>
  );
};
 
export default Component;