'use client';

import {
  IntervalSettings,
  IntervalControls,
  CounterDisplay,
  StatusDisplay,
} from './components';
import { useIntervalFnState } from './hooks/use-interval-fn-state';

function IntervalFnDemo(): JSX.Element {
  const {
    interval,
    counter,
    isActive,
    reset,
    handleIntervalChange,
    handlePauseResume,
  } = useIntervalFnState();

  return (
    <div className="bg-background mx-auto max-w-md space-y-8 rounded-lg p-8">
      <IntervalSettings
        interval={interval}
        onIntervalChange={handleIntervalChange}
      />
      <div className="flex flex-col items-center space-y-4">
        <CounterDisplay counter={counter} />
        <IntervalControls
          isActive={isActive}
          onReset={reset}
          onPauseResume={handlePauseResume}
        />
      </div>
      <StatusDisplay isActive={isActive} />
    </div>
  );
}

export default IntervalFnDemo;
