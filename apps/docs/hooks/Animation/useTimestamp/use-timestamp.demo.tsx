'use client';

import { useEffect, useState } from 'react';
import { useTimestamp } from './use-timestamp';

function TimestampDemo(): JSX.Element {
  const { pause, resume } = useTimestamp({
    controls: true,
    offset: 0,
    immediate: true,
    interval: 1,
    callback: (ts) => {
      console.log('Timestamp:', ts);
    },
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
    <div>
      <h1>useTimestamp Demo</h1>
      <p>Current Timestamp: {timestamp}</p>
      <button type="button" onClick={pause}>
        Pause
      </button>
      <button type="button" onClick={resume}>
        Resume
      </button>
    </div>
  );
}

export default TimestampDemo;
