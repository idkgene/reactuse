'use client';

import React, { useState } from 'react';
import { useIntervalFn } from './useIntervalFn';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
    { immediate: false },
  );

  return (
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
      <div className="py-8 text-base">
        <div className="my-4">
          <span>{currentGreeting}</span>
        </div>
        <div className="my-4">
          <Label htmlFor="interval">Interval (ms):</Label>
          <Input
            id="interval"
            type="number"
            className="mt-1"
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
          />
        </div>
        <div className="my-4 flex gap-3">
          <Button onClick={isActive ? pause : resume}>
            {isActive ? 'Pause' : 'Resume'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntervalFnDemo;
