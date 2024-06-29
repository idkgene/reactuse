'use client';

import { Button } from '../../../components/ui/button';
import { useInterval } from './use-interval';

export default function IntervalDemo(): JSX.Element {
  const { counter, reset, pause, resume } = useInterval(250, {
    immediate: true,
  });

  return (
    <div className="relative mb-[10px] p-[2em] transition-colors">
      <div>Interval Fired: {counter}</div>
      <div className="my-4 flex gap-2">
        <Button onClick={reset}>Reset</Button>
        <Button onClick={pause}>Pause</Button>
        <Button onClick={resume}>Resume</Button>
      </div>
    </div>
  );
}
