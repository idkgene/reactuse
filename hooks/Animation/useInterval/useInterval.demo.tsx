'use client';

import { useInterval } from './useInterval';

export default function IntervalDemo() {
  const { counter, reset, pause, resume } = useInterval(1000, {
    immediate: true,
  });

  return (
    <div className="not-prose mb-[10px] rounded-[8px] transition-colors bg-black p-8 border rounded-lg py-4 px-8">
      <div className="text-[12px] font-medium leading-[28px] margin-[0.5rem]  text-[rgba(235,235,245,.6)]">
        Interal Fired: {counter}
      </div>
      <div className="flex space-x-4">
        <button
          className="inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 text-xs gap-1.5"
          onClick={reset}
        >
          Reset
        </button>
        <button
          className="inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 text-xs gap-1.5"
          onClick={pause}
        >
          Pause
        </button>
        <button
          className="inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 text-xs gap-1.5"
          onClick={resume}
        >
          Resume
        </button>
      </div>
    </div>
  );
}
