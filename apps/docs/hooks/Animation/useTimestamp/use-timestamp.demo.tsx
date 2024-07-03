'use client';

import { useEffect, useState } from 'react';
import { useTimestamp } from './use-timestamp';
import Demo from '@/components/Common/Demo/demo';
import { Button } from '@/components/Common/Button/button';

function TimestampDemo(): JSX.Element {
  const { pause, resume } = useTimestamp({
    controls: true,
    offset: 0,
    immediate: true,
    interval: 1,
  });

  const [timestamp, setTimestamp] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimestamp(Date.now());
    }, 1);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Demo category="Animation" title="useTimestamp">
      <p className="text-sm font-semibold">Current Timestamp: {timestamp}</p>
      <div className="flex gap-2">
        <Button type="button" onClick={pause}>
          Pause
        </Button>
        <Button type="button" onClick={resume}>
          Resume
        </Button>
      </div>
    </Demo>
  );
}

export default TimestampDemo;
