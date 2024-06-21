'use client';

import { Button } from '@/components/ui/button';
import { useInterval } from './useInterval';

export default function IntervalDemo() {
  const { counter, reset, pause, resume } = useInterval(1000, {
    immediate: true,
  });

  return (
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
      <div>Interval Fired: {counter}</div>
      <div className="flex my-4 gap-2">
        <Button onClick={reset}>Reset</Button>
        <Button onClick={pause}>Pause</Button>
        <Button onClick={resume}>Resume</Button>
      </div>
    </div>
  );
}
