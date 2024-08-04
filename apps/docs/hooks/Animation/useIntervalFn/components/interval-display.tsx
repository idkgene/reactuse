interface IntervalDisplayProps {
  count: number;
}

function IntervalDisplay({ count }: IntervalDisplayProps): JSX.Element {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Count: {count}</h2>
    </div>
  );
}

export { IntervalDisplay };
