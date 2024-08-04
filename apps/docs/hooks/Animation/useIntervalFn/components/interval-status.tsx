import { Badge } from '@/components/ui/badge';

interface IntervalStatusProps {
  isActive: boolean;
}

function IntervalStatus({ isActive }: IntervalStatusProps): JSX.Element {
  return (
    <div className="text-center">
      <Badge variant={isActive ? 'default' : 'secondary'}>
        {isActive ? 'Active' : 'Paused'}
      </Badge>
    </div>
  );
}

export { IntervalStatus };
