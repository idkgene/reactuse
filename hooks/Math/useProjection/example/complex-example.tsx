import { useProjection } from '../useProjection';
import * as React from 'react';

const Component = () => {
  const [inputValue, setInputValue] = React.useState(0.25);
  const [fromDomain, setFromDomain] = React.useState<[number, number]>([0, 1]);
  const [toDomain, setToDomain] = React.useState<[number, number]>([0, 200]);

  const projectedValue = useProjection(
    () => inputValue,
    fromDomain,
    () => toDomain
  );

  return (
    <div>
      <p>Input value: {inputValue}</p>
      <p>Projected value: {projectedValue}</p>
      <button onClick={() => setInputValue(0.75)}>Update input value</button>
      <button onClick={() => setFromDomain([-1, 1])}>Update from domain</button>
      <button onClick={() => setToDomain([100, 300])}>Update to domain</button>
    </div>
  );
};

export default Component;
