function CounterDisplay({ counter }: { counter: number }): JSX.Element {
  return <div className="text-4xl font-bold">{counter}</div>;
}

function StatusDisplay({ isActive }: { isActive: boolean }): JSX.Element {
  return (
    <div className="text-muted-foreground text-center text-sm">
      Status: {isActive ? 'Active' : 'Paused'}
    </div>
  );
}

export { CounterDisplay, StatusDisplay };
