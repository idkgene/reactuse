'use client';

import { useState, useEffect } from 'react';
import { useToggle } from './useToggle';

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
      <p>
        <span>Is Active:</span> {String(isActive)}
      </p>
      <button
        onClick={() => toggleActive()}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      >
        Toggle Active
      </button>
    </div>
  );
}
