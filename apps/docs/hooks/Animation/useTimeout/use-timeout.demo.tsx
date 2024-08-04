'use client';

import {
  TimeoutDisplay,
  StatusDisplay,
  TimeoutControls,
  TimeoutSettings,
} from './components';
import { useTimeoutState } from './hooks/use-timeout-state';

function TimeoutDemo(): JSX.Element {
  const {
    isReady,
    isRunning,
    interval,
    start,
    stop,
    reset,
    handleIntervalChange,
  } = useTimeoutState();

  return (
    <div className="bg-background mx-auto max-w-md space-y-8 rounded-lg p-8">
      <TimeoutSettings
        interval={interval}
        onIntervalChange={handleIntervalChange}
      />
      <div className="flex flex-col items-center space-y-4">
        <TimeoutDisplay isReady={isReady} />
        <TimeoutControls
          isRunning={isRunning}
          onStart={start}
          onStop={stop}
          onReset={reset}
        />
      </div>
      <StatusDisplay isRunning={isRunning} isReady={isReady} />
    </div>
  );
}

export default TimeoutDemo;
