import { useState, useCallback } from 'react';
import { useIntervalFn } from '../use-interval-fn';
import { DEFAULT_INTERVAL } from '../components/constants';

interface IntervalFnState {
  interval: number;
  counter: number;
  isActive: boolean;
  reset: () => void;
  handleIntervalChange: (value: number) => void;
  handlePauseResume: () => void;
}

export function useIntervalFnState(): IntervalFnState {
  const [interval, setInterval] = useState(DEFAULT_INTERVAL);
  const [counter, setCounter] = useState(0);

  const { isActive, pause, resume } = useIntervalFn(() => {
    setCounter((prevCounter) => prevCounter + 1);
  }, interval);

  const handleIntervalChange = useCallback((value: number): void => {
    setInterval(value);
  }, []);

  const handlePauseResume = useCallback((): void => {
    isActive ? pause() : resume();
  }, [isActive, pause, resume]);

  const reset = useCallback((): void => {
    setCounter(0);
  }, []);

  return {
    interval,
    counter,
    isActive,
    reset,
    handleIntervalChange,
    handlePauseResume,
  };
}
