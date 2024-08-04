'use client';

import { CounterDisplay, StatusDisplay } from './components/displays';
import IntervalControls from './components/interval-controls';
import IntervalSettings from './components/interval-settings';
import { useIntervalState } from './hooks/use-interval-state';

function IntervalDemo(): JSX.Element {
  const {
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
  } = useIntervalState();

  return (
    <div className="bg-background mx-auto max-w-md space-y-8 rounded-lg p-8">
      <IntervalSettings
        interval={interval}
        maxCount={maxCount}
        onIntervalChange={handleIntervalChange}
        onMaxCountChange={handleMaxCountChange}
      />
      <div className="flex flex-col items-center space-y-4">
        <CounterDisplay counter={counter} />
        <IntervalControls
          isRunning={isRunning}
          onReset={reset}
          onPauseResume={handlePauseResume}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
        />
      </div>
      <StatusDisplay isRunning={isRunning} />
    </div>
  );
}

export default IntervalDemo;
