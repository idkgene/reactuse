import { MIN_INTERVAL, MAX_INTERVAL, INTERVAL_STEP } from './constants';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

interface IntervalSettingsProps {
  interval: number;
  maxCount: number | undefined;
  onIntervalChange: (value: number) => void;
  onMaxCountChange: (value: number | undefined) => void;
}

function IntervalSettings({
  interval,
  maxCount,
  onIntervalChange,
  onMaxCountChange,
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
      <div className="space-y-2">
        <Label htmlFor="maxCount" className="text-sm font-medium">
          Max Count
        </Label>
        <Input
          id="maxCount"
          type="number"
          value={maxCount ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            onMaxCountChange(value ? Number(value) : undefined);
          }}
          placeholder="Optional"
          className="w-full"
        />
      </div>
    </div>
  );
}

export default IntervalSettings;
