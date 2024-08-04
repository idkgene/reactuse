function TimeoutDisplay({ isReady }: { isReady: boolean }): JSX.Element {
  return (
    <div className="text-4xl font-bold">
      {isReady ? 'Timeout Completed!' : 'Waiting...'}
    </div>
  );
}

function StatusDisplay({
  isRunning,
  isReady,
}: {
  isRunning: boolean;
  isReady: boolean;
}): JSX.Element {
  let status = 'Idle';
  if (isRunning) status = 'Running';
  if (isReady) status = 'Completed';

  return (
    <div className="text-muted-foreground text-center text-sm">
      Status: {status}
    </div>
  );
}

export { TimeoutDisplay, StatusDisplay };
