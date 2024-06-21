import { useTrunc } from '../useTrunc';
import * as React from 'react';

const Component = () => {
  const [truncatedNumber, truncateNumber] = useTrunc();

  return (
    <div>
      <p>Truncated number: {truncatedNumber}</p>
      <button onClick={() => truncateNumber(3.14)}>Truncate 3.14</button>
      <button onClick={() => truncateNumber(2.78)}>Truncate 2.78</button>
    </div>
  );
};

export default Component;
