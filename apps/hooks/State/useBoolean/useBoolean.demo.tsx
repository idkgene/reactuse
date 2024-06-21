'use client';

import { useBoolean } from './useBoolean';

export default function UseBooleanDemo() {
  const [isToggled, toggleIsToggled, setIsToggled] = useBoolean(false);

  return (
    <>
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
    </>
  );
}
