import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IntervalControlsProps {
  isActive: boolean;
  onReset: () => void;
  onPauseResume: () => void;
}

function IntervalControls({
  isActive,
  onReset,
  onPauseResume,
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
        title={isActive ? 'Pause' : 'Resume'}
      >
        {isActive ? <Pause className="size-4" /> : <Play className="size-4" />}
      </Button>
    </div>
  );
}

export { IntervalControls };
