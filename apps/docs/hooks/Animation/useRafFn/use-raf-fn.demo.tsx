'use client';

import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { useRafFn } from './use-raf-fn';
import Demo from '@/components/Common/Demo/demo';

export default function RafDemo(): JSX.Element {
  const [count, setCount] = useState(0);
  const [delta, setDelta] = useState(0);

  const { pause, resume, isActive } = useRafFn(
    ({ delta: frameDelta }) => {
      setCount((prevCount) => prevCount + 1);
      setDelta(frameDelta);
    },
    { fpsLimit: 60 },
  );

  return (
    <Demo category="Animation" title="useRafFn">
      <p>
        <strong>Frames: </strong>
        {count}
      </p>
      <p>
        <strong>Delta:</strong> {Math.round(delta)}ms
      </p>
      <p>
        <strong>FPS Limit:</strong> {60}
      </p>
      <div className="flex gap-3">
        <Button onClick={pause}>Pause</Button>
        <Button onClick={resume}>Resume</Button>
      </div>
    </Demo>
  );
}
