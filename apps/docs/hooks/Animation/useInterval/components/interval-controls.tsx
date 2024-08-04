import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IntervalControlsProps {
  isRunning: boolean;
  onReset: () => void;
  onPauseResume: () => void;
  onDecrement: () => void;
  onIncrement: () => void;
}

function IntervalControls({
  isRunning,
  onReset,
  onPauseResume,
  onDecrement,
  onIncrement,
}: IntervalControlsProps): JSX.Element {
  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        className="p-0"
        size="icon"
        onClick={onReset}
        title="Reset"
      >
        <RotateCcw className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="p-0"
        onClick={onPauseResume}
        title={isRunning ? 'Pause' : 'Resume'}
      >
        {isRunning ? <Pause className="size-4" /> : <Play className="size-4" />}
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="p-0"
        onClick={onDecrement}
        title="Decrement"
      >
        <Minus className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="p-0"
        onClick={onIncrement}
        title="Increment"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}

export default IntervalControls;
