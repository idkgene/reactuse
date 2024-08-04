import { Play, Square, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimeoutControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

function TimeoutControls({
  isRunning,
  onStart,
  onStop,
  onReset,
}: TimeoutControlsProps): JSX.Element {
  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="icon"
        className="p-0"
        onClick={onStart}
        disabled={isRunning}
        title="Start"
      >
        <Play className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="p-0"
        onClick={onStop}
        disabled={!isRunning}
        title="Stop"
      >
        <Square className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="p-0"
        onClick={onReset}
        title="Reset"
      >
        <RotateCcw className="size-4" />
      </Button>
    </div>
  );
}

export { TimeoutControls };