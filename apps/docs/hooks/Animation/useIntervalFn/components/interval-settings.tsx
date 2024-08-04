import { MIN_INTERVAL, MAX_INTERVAL, INTERVAL_STEP } from './constants';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface IntervalSettingsProps {
  interval: number;
  onIntervalChange: (value: number) => void;
}

function IntervalSettings({
  interval,
  onIntervalChange,
}: IntervalSettingsProps): JSX.Element {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="interval" className="text-sm font-medium">
          Interval: {interval}ms
        </Label>
        <Slider
          id="interval"
          min={MIN_INTERVAL}
          max={MAX_INTERVAL}
          step={INTERVAL_STEP}
          value={[interval]}
          onValueChange={(value: number[]) => {
            onIntervalChange(value[0]);
          }}
        />
      </div>
    </div>
  );
}

export { IntervalSettings };
