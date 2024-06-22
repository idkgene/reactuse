'use client';

import { useEffect, useState } from 'react';
import { useNow } from './useNow';
import { Button } from '@/components/ui/button';

const NowDemo = () => {
  const { now, pause, resume } = useNow({ controls: true, interval: 1000 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
      <div className="flex justify-center items-center space-x-4">
        {isClient && (
          <span className="text-2xl">{now.toLocaleTimeString()}</span>
        )}
      </div>
      <div className="flex justify-center mt-4 gap-4">
        <Button onClick={pause}>Pause</Button>
        <Button onClick={resume}>Resume</Button>
      </div>
    </div>
  );
};

export default NowDemo;
