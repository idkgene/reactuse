import React, { useRef } from 'react';
import { useFocus } from './useFocus';

const UseFocusDemo = () => {
  const { focused, setFocused } = useFocus();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <button
        ref={buttonRef}
        onMouseDown={() => setFocused(true)}
        onMouseUp={() => setFocused(false)}
        style={{ outline: focused ? '2px solid red' : 'none' }}
      >
        Click me to change focus state
      </button>
    </div>
  );
};

export default UseFocusDemo;
