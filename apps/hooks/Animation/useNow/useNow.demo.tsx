'use client';

import React, { useEffect, useState } from 'react';
import { useNow } from './useNow';
import { Button } from '@/components/ui/button';

const NowDemo: React.FC = () => {
  const { pause, resume } = useNow({ controls: true, interval: 1000 });
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
      <div className="flex justify-center items-center space-x-4">
        <span className="text-2xl" suppressHydrationWarning>
          {now.toLocaleTimeString()}
        </span>
      </div>
      <div className="flex justify-center mt-4 gap-4">
        <Button onClick={pause}>Pause</Button>
        <Button onClick={resume}>Resume</Button>
      </div>
    </div>
  );
};

export default NowDemo;
