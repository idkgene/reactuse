'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { useToggle } from './use-toggle';

export default function UseToggleDemo(): JSX.Element | null {
  const [isMounted, setIsMounted] = useState(false);

  const [status, toggleStatus] = useToggle('OFF', {
    truthyValue: 'ON',
    falsyValue: 'OFF',
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative mb-[10px] p-[2em] transition-colors">
      <p>Value: {status}</p>
      <div className="flex gap-3">
        <Button
          onClick={() => {
            toggleStatus();
          }}
        >
          Toggle
        </Button>
        <Button
          onClick={() => {
            toggleStatus('ON');
          }}
        >
          Set ON
        </Button>
        <Button
          onClick={() => {
            toggleStatus('OFF');
          }}
        >
          Set OFF
        </Button>{' '}
      </div>
    </div>
  );
}
