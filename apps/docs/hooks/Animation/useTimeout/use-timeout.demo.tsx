'use client';

import { useState } from 'react';
import { useTimeout } from './use-timeout';
import Demo from '@/components/Common/Demo/demo';
import { Button } from '@/components/Common/Button/button';

function TimeoutDemo(): JSX.Element {
  const [isRunning, setIsRunning] = useState(false);

  const timeout = useTimeout(1000, {
    controls: true,
    callback: () => {
      setIsRunning(false);
    },
  }) as { ready: boolean; start: () => void };

  const handleClick = (): void => {
    if (timeout.ready && 'start' in timeout) {
      setIsRunning(true);
      timeout.start();
    }
  };

  return (
    <Demo category="Animation" title="useTimeout">
      <p className="text-sm font-semibold">Ready: {timeout.ready.toString()}</p>
      <Button type="button" onClick={handleClick} disabled={isRunning}>
        {isRunning ? 'Running...' : 'Start Timeout'}
      </Button>
    </Demo>
  );
}

export default TimeoutDemo;
