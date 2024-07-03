'use client';

import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useIntervalFn } from './use-interval-fn';
import Demo from '@/components/Common/Demo/demo';

const greetings = [
  'Hello',
  'こんにちは',
  'Bonjour',
  'Привет',
  'Hey',
  '你好',
  'Yo!',
];

export default function IntervalFnDemo(): JSX.Element {
  const [currentGreeting, setCurrentGreeting] = useState(greetings[0]);
  const [interval, setInterval] = useState(250);

  const { isActive, pause, resume } = useIntervalFn(
    () => {
      const randomIndex = Math.floor(Math.random() * greetings.length);
      setCurrentGreeting(greetings[randomIndex]);
    },
    interval,
    { immediate: false },
  );

  return (
    <Demo category="Animation" title="useIntervalFn">
      <div>
        <div className="my-4">
          <span>{currentGreeting}</span>
        </div>
        <div className="my-4">
          <label htmlFor="interval">Interval (ms):</label>
          <Input
            id="interval"
            type="number"
            className="mt-1"
            value={interval}
            onChange={(e) => {
              setInterval(Number(e.target.value));
            }}
          />
        </div>
        <div className="my-4 flex gap-3">
          <Button onClick={isActive ? pause : resume}>
            {isActive ? 'Pause' : 'Resume'}
          </Button>
        </div>
      </div>
    </Demo>
  );
}
