function CounterDisplay({ counter }: { counter: number }): JSX.Element {
  return <div className="text-4xl font-bold">{counter}</div>;
}

function StatusDisplay({ isRunning }: { isRunning: boolean }): JSX.Element {
  return (
    <div className="text-muted-foreground text-center text-sm">
      Status: {isRunning ? 'Running' : 'Paused'}
    </div>
  );
}

export { CounterDisplay, StatusDisplay };
