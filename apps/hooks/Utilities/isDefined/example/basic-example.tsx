import { isDefined } from '../isDefined';
import * as React from 'react';

const Component = () => {
  const maybeValue: string | null | undefined = 'Hello';

  if (isDefined(maybeValue)) {
    // maybeValue is now narrowed to `string`
    console.log(maybeValue); // Output: 'Hello'
  }

  const anotherValue: number | null = null;
  const isAnotherDefined = isDefined(anotherValue); // Output: false

  return (
    <>
      <div>{isAnotherDefined}</div>
      <div>{isDefined(maybeValue)}</div>
    </>
  );
};

export default Component;
