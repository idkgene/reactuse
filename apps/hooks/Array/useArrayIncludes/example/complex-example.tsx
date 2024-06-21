import { useArrayIncludes } from '../useArrayIncludes';
import * as React from 'react';

const Component = () => {
  const [objects, setObjects] = React.useState([{ key: 'a' }, { key: 'b' }]);

  const customComparator = (element: { key: any }, value: any) =>
    element.key === value;

  const includesObject = useArrayIncludes(objects, 'a', {
    comparator: customComparator,
  });

  return (
    <div>
      <p>Includes object with key 'a': {includesObject ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Component;