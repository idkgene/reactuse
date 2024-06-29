import React from 'react';
import { useIsTouchDevice } from './useIsTouchDevice';

function UseIsTouchDeviceDemo() {
  const isTouchDevice = useIsTouchDevice();

  return (
    <div>
      <h1>Is Touch Device?</h1>
      <p>{isTouchDevice ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default UseIsTouchDeviceDemo;
