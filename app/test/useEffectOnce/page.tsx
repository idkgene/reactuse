"use client"
import { useEffect, useRef } from 'react';
import { useEffectOnce } from '../../../hooks/useEffectOnce';

const TestComponent = () => {
  const renderCount = useRef(0);

  useEffectOnce(() => {
    console.log('This effect will run only once');
  });

  useEffect(() => {
    renderCount.current++;
    console.log(`This effect runs on render ${renderCount.current}`);
  });

  return (
    <div>
      <h1>Test Component</h1>
      <p>This component demonstrates the difference between useEffectOnce and useEffect.</p>
    </div>
  );
};

export default TestComponent;