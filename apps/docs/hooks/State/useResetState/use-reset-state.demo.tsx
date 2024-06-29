'use client';

import { useResetState } from './use-reset-state';
import { Button } from '@/components/ui/button';

function ResetStateDemo(): JSX.Element {
  const [state, setState, resetState] = useResetState('Initial State');

  return (
    <div>
      <p>Current State: {state}</p>
      <div className="flex gap-3">
        <Button
          onClick={() => {
            setState('Updated State');
          }}
        >
          Update State
        </Button>
        <Button onClick={resetState}>Reset State</Button>
      </div>
    </div>
  );
}

export default ResetStateDemo;
