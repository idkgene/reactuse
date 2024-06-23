'use client';

import React, { useEffect, useState } from 'react';
import { useTimeAgo } from './useTimeAgo';

const TimeAgoDemo: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [date, setDate] = useState<Date | null>(null);
  const timeAgo = useTimeAgo(date || new Date());

  const maxOffset = 31536000; // Примерно год в секундах

  useEffect(() => {
    setDate(new Date(Date.now() + offset * 1000));
  }, [offset]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOffset(Number(event.target.value));
  };

  if (!date) {
    return null;
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Time Ago Demo</h2>
      <p>Move the slider to see how the time changes:</p>
      <input
        type="range"
        min={-maxOffset}
        max={maxOffset}
        value={offset}
        onChange={handleChange}
        style={{ width: '100%' }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        <span>-1 year</span>
        <span>Now</span>
        <span>+1 year</span>
      </div>
      <p>Selected time: {date.toLocaleString()}</p>
      <p>
        Time ago: <strong>{timeAgo}</strong>
      </p>
    </div>
  );
};

export default TimeAgoDemo;
