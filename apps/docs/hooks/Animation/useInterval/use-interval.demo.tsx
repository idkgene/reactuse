'use client';

import { Button } from '../../../components/ui/button';
import { useInterval } from './use-interval';
import Demo from '@/components/Common/Demo/demo';

export default function IntervalDemo(): JSX.Element {
  const { counter, reset, pause, resume } = useInterval(250, {
    immediate: true,
  });

  return (
    <Demo category="Animation" title="useInterval">
      <div className="text-sm font-semibold">Interval Fired: {counter}</div>
      <div className="my-4 flex gap-2">
        <Button onClick={reset}>Reset</Button>
        <Button onClick={pause}>Pause</Button>
        <Button onClick={resume}>Resume</Button>
      </div>
    </Demo>
  );
}
