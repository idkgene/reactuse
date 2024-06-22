'use client';

import React from 'react';
import useTimeoutFn from './useTimeoutFn';
import { Button } from '@/components/ui/button';

const TimeoutFnDemo: React.FC = () => {
  const [text, setText] = React.useState('Fired');

  const { isPending, start } = useTimeoutFn(
    () => {
      setText('Fired');
    },
    3000,
    { immediate: false },
  );

  const handleRestart = () => {
    setText('Please wait 3 seconds');
    start();
  };

  return (
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
      <p>{text}</p>
      <Button onClick={handleRestart} disabled={isPending}>
        Restart
      </Button>
    </div>
  );
};

export default TimeoutFnDemo;
