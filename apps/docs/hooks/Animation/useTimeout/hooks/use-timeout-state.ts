import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useTimeout } from '../use-timeout';

interface TimeoutState {
  isReady: boolean;
  isRunning: boolean;
  interval: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  handleIntervalChange: (value: number) => void;
}

function useTimeoutState(): TimeoutState {
  const [interval, setInterval] = useState<number>(3000);

  const {
    isReady,
    isRunning,
    start: startTimeout,
    stop: stopTimeout,
    reset: resetTimeout,
  } = useTimeout(interval, {
    controls: true,
    callback: () => {
      toast.success('Timeout completed!', {
        description: `Completed after ${String(interval)}ms`,
      });
    },
  });

  const start = useCallback(() => {
    startTimeout();
    toast('Timeout started', {
      description: `Will complete in ${String(interval)}ms`,
    });
  }, [startTimeout, interval]);

  const stop = useCallback(() => {
    stopTimeout();
    toast.error('Timeout stopped', {
      description: 'The timeout was manually stopped',
    });
  }, [stopTimeout]);

  const reset = useCallback(() => {
    resetTimeout();
    toast.info('Timeout reset', {
      description: `Reset to ${String(interval)}ms`,
    });
  }, [resetTimeout, interval]);

  const handleIntervalChange = useCallback((value: number) => {
    setInterval(value);
    toast('Interval updated', {
      description: `New interval: ${String(value)}ms`,
    });
  }, []);

  return {
    isReady,
    isRunning,
    interval,
    start,
    stop,
    reset,
    handleIntervalChange,
  };
}

export { useTimeoutState };
