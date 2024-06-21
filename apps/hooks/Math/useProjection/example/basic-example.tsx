import { useProjection } from '../useProjection';
import * as React from 'react';

const Component = () => {
  const inputValue = 0.5;
  const fromDomain: [number, number] = [0, 1];
  const toDomain: [number, number] = [0, 100];

  const projectedValue = useProjection(inputValue, fromDomain, toDomain);

  return (
    <div>
      <p>Input value: {inputValue}</p>
      <p>Projected value: {projectedValue}</p>
    </div>
  );
};

export default Component;
