'use client';

import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import useTimeoutFn from './use-timeout-fn';
import Demo from '@/components/Common/Demo/demo';

function TimeoutFnDemo(): JSX.Element {
  const [text, setText] = useState('Fired');

  const { isPending, start } = useTimeoutFn(
    () => {
      setText('Fired');
    },
    3000,
    { immediate: false },
  );

  const handleRestart = (): void => {
    setText('Please wait 3 seconds');
    start();
  };

  return (
    <Demo category="Animation" title="useTimeoutFn">
      <p className="text-sm font-semibold">{text}</p>
      <Button onClick={handleRestart} disabled={isPending}>
        Restart
      </Button>
    </Demo>
  );
}

export default TimeoutFnDemo;
