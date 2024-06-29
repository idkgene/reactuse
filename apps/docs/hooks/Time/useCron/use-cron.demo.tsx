'use client';

import React, { useState } from 'react';
import useCron from './use-cron';

function CronDemo() {
  const [expression, setExpression] = useState('* * * * *');
  const [tickCount, setTickCount] = useState(0);
  const [isRunning, nextRun, readableExpression] = useCron({
    expression,
    onTick: () => { setTickCount((count) => count + 1); },
    timezone: 'UTC',
  });

  return (
    <div>
      <h1>Cron Demo</h1>
      <div>
        <label htmlFor="expression">Cron Expression:</label>
        <input
          id="expression"
          type="text"
          value={expression}
          onChange={(e) => { setExpression(e.target.value); }}
        />
      </div>
      <div>
        <strong>Readable Expression:</strong> {readableExpression}
      </div>
      <div>
        <strong>Next Run:</strong> {nextRun}
      </div>
      <div>
        <strong>Is Running:</strong> {isRunning ? 'Yes' : 'No'}
      </div>
      <div>
        <strong>Tick Count:</strong> {tickCount}
      </div>
    </div>
  );
}

export default CronDemo;
