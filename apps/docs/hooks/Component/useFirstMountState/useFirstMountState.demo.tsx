import React from 'react';
import { useFirstMountState } from './useFirstMountState';

function UseFirstMountStateDemo() {
  const isInitialMount = useFirstMountState();

  return (
    <div>
      <p>Is Initial Mount: {isInitialMount.toString()}</p>
      {!isInitialMount && <p>This is not the initial mount</p>}
    </div>
  );
}

export default UseFirstMountStateDemo;
