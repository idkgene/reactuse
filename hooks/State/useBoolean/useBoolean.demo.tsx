'use client';
import React from 'react';
import { useBoolean } from './useBoolean';
import Demo from '@/components/Common/Demo/demo';

const UseBooleanDemo = () => {
  const [isToggled, toggleIsToggled, setIsToggled] = useBoolean(false);

  return (
    <Demo href="#">
      <p>
        The toggle is{' '}
        {isToggled ? (
          <span className="text-[#44bd87]">ON</span>
        ) : (
          <span className="text-[#ff0f0f]">OFF</span>
        )}
        .
      </p>
      <div className="flex flex-col">
        <button onClick={toggleIsToggled}>Toggle</button>
        <button onClick={() => setIsToggled(true)}>Turn ON</button>
        <button onClick={() => setIsToggled(false)}>Turn OFF</button>
      </div>
    </Demo>
    // <div>
    // </div>
  );
};

export default UseBooleanDemo;
