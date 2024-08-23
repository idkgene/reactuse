'use client';

import { useState } from 'react';
import { Clock, Pause, Play, RefreshCcw } from 'lucide-react';
import { useIntervalFn } from './use-interval-fn';
import { Button } from '@/components/ui/button';

function IntervalFnDemo(): JSX.Element {
  const [count, setCount] = useState(0);
  const [intervalValue, setIntervalValue] = useState(1000);
  const [status, setStatus] = useState<'Running' | 'Paused'>('Running');

  const { isActive, pause, resume, reset, setInterval } = useIntervalFn(
    () => {
      setCount((prev) => prev + 1);
    },
    intervalValue,
    { immediate: true },
  );

  const handlePause = (): void => {
    pause();
    setStatus('Paused');
  };

  const handleResume = (): void => {
    resume();
    setStatus('Running');
  };

  const handleReset = (): void => {
    reset();
    setCount(0);
    setStatus('Running');
  };

  const handleChangeInterval = (): void => {
    const newInterval = intervalValue === 1000 ? 500 : 1000;
    setIntervalValue(newInterval);
    setInterval(newInterval);
  };

  return (
    <div className="not-prose mx-auto max-w-screen-sm">
      <div className="flex items-center gap-2">
        <Clock className="size-6" />
        <h2 className="text-lg font-semibold">Counter: {count}</h2>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <Button onClick={handlePause} variant="outline" disabled={!isActive}>
          <Pause className="mr-2 size-4" /> Pause
        </Button>
        <Button onClick={handleResume} disabled={isActive}>
          <Play className="mr-2 size-4" /> Resume
        </Button>
        <Button onClick={handleReset}>
          <RefreshCcw className="mr-2 size-4" /> Reset
        </Button>
      </div>
      <div className="mt-4">
        <Button onClick={handleChangeInterval} variant="outline">
          Change Interval (Current: {intervalValue}ms)
        </Button>
      </div>
      <div className="mt-4 text-sm font-medium text-gray-500">
        Status: {status}
      </div>
    </div>
  );
}

export default IntervalFnDemo;
