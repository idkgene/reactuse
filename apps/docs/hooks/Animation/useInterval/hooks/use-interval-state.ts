import { useCallback, useState } from 'react';
import { type IntervalSettings, useInterval } from '../use-interval';
import { DEFAULT_INTERVAL } from '../components/constants';

interface IntervalState {
  interval: number;
  maxCount: number | undefined;
  counter: number;
  isRunning: boolean;
  reset: () => void;
  handleIntervalChange: (value: number) => void;
  handleMaxCountChange: (value: number | undefined) => void;
  handleDecrement: () => void;
  handleIncrement: () => void;
  handlePauseResume: () => void;
}

function useIntervalState(): IntervalState {
  const [interval, setInterval] = useState(DEFAULT_INTERVAL);
  const [maxCount, setMaxCount] = useState<number | undefined>(undefined);

  const intervalSettings: IntervalSettings = {
    immediate: true,
    maxCount,
    callback: (count) => {
      console.log(`Count: ${String(count)}`);
    },
  };

  const { counter, isRunning, reset, pause, resume, setCounter } = useInterval(
    interval,
    intervalSettings,
  );

  const handleIntervalChange = (value: number): void => {
    setInterval(value);
  };

  const handleMaxCountChange = useCallback((value: number | undefined) => {
    setMaxCount(value);
  }, []);

  const handleDecrement = (): void => {
    setCounter(Math.max(0, counter - 1));
  };
  const handleIncrement = (): void => {
    setCounter(counter + 1);
  };
  const handlePauseResume = (): void => {
    isRunning ? pause() : resume();
  };

  return {
    interval,
    maxCount,
    counter,
    isRunning,
    reset,
    handleIntervalChange,
    handleMaxCountChange,
    handleDecrement,
    handleIncrement,
    handlePauseResume,
  };
}

export { useIntervalState };
