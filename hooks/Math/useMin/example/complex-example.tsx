import { useMin } from '../useMin';
import * as React from 'react';

const Component = () => {
  const values = [8, 2, 6, 4];

  const minValueFromArray = useMin(values);

  return (
    <div>
      <p>Minimum value from array: {minValueFromArray}</p>
    </div>
  );
};

export default Component;
