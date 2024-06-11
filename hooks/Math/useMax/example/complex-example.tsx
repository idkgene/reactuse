import { useMax } from '../useMax';
import * as React from 'react';

const Component = () => {
  const values = [8, 2, 6, 4];

  const maxValueFromArray = useMax(values);

  return (
    <div>
      <p>Maximum value from array: {maxValueFromArray}</p>
    </div>
  );
};

export default Component;
