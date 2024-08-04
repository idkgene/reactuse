import { type ChangeEvent } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface TimeoutSettingsProps {
  interval: number;
  onIntervalChange: (value: number) => void;
}

function TimeoutSettings({
  interval,
  onIntervalChange,
}: TimeoutSettingsProps): JSX.Element {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="interval" className="text-sm font-medium">
          Timeout Interval (ms)
        </Label>
        <Input
          id="interval"
          type="number"
          value={interval}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onIntervalChange(Number(e.target.value));
          }}
          min={0}
          step={100}
          className="w-full"
        />
      </div>
    </div>
  );
}

export { TimeoutSettings };
