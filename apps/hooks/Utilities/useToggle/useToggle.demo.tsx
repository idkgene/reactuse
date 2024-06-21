'use client';

import { useState, useEffect } from 'react';
import { useToggle } from './useToggle';
import { Button } from '@/components/ui/button';

export default function UseToggleDemo() {
  const [isMounted, setIsMounted] = useState(false);

  const [isActive, toggleActive] = useToggle();

  const [status, toggleStatus] = useToggle('off', {
    truthyValue: 'on',
    falsyValue: 'off',
  });

  const [currentNumber, toggleNumber] = useToggle(0, {
    truthyValue: 1,
    falsyValue: 0,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
      <p>Is Active: {String(isActive)}</p>
      <Button onClick={() => toggleActive()}>Toggle Active</Button>
    </div>
  );
}
