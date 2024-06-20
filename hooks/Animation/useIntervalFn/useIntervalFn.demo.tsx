'use client';

import React, { useState } from 'react';
import { useIntervalFn } from './useIntervalFn';

const greetings = [
  'Hello',
  'こんにちは',
  'Bonjour',
  'Привет',
  'Hey',
  '你好',
  'Yo!',
];

const IntervalFnDemo = () => {
  const [currentGreeting, setCurrentGreeting] = useState(greetings[0]);
  const [interval, setInterval] = useState(500);

  const { isActive, pause, resume } = useIntervalFn(
    () => {
      const randomIndex = Math.floor(Math.random() * greetings.length);
      setCurrentGreeting(greetings[randomIndex]);
    },
    interval,
    { immediate: false }
  );

  return (
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
      <div className="py-8 text-base">
        <div className="my-4">
          <span>{currentGreeting}</span>
        </div>
        <div className="my-4">
          <label htmlFor="interval" className="block">
            Interval (ms):
          </label>
          <input
            id="interval"
            type="number"
            value={interval}
            onChange={e => setInterval(Number(e.target.value))}
            className="flex h-10 max-w-[15rem] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="my-4 flex gap-3">
          <button
            onClick={isActive ? pause : resume}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ${
              isActive ? 'bg-red-500' : 'bg-green-500'
            } focus:outline-none`}
          >
            {isActive ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntervalFnDemo;
