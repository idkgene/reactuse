'use client';

import React from 'react';
import { Button } from '../../../components/ui/button';
import useTimeoutFn from './use-timeout-fn';

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
    <div className="relative mb-[10px] p-[2em] transition-colors">
      <p>{text}</p>
      <Button onClick={handleRestart} disabled={isPending}>
        Restart
      </Button>
    </div>
  );
};

export default TimeoutFnDemo;
