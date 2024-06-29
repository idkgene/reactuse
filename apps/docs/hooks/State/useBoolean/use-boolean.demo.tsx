'use client';

import { Button } from '../../../components/ui/button';
import { useBoolean } from './use-boolean';

export default function UseBooleanDemo(): JSX.Element {
  const [isToggled, toggleIsToggled, setIsToggled] = useBoolean(false);

  return (
    <>
      <p className="relative mb-[10px] p-[2em] transition-colors">
        The toggle is{' '}
        {isToggled ? (
          <span className="text-[#44bd87]">ON</span>
        ) : (
          <span className="text-[#ff0f0f]">OFF</span>
        )}
        .
      </p>
      <div className="flex gap-3">
        <Button onClick={toggleIsToggled}>Toggle</Button>
        <Button
          onClick={() => {
            setIsToggled(true);
          }}
        >
          Turn ON
        </Button>
        <Button
          onClick={() => {
            setIsToggled(false);
          }}
        >
          Turn OFF
        </Button>
      </div>
    </>
  );
}
