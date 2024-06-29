'use client';

import { useBreakpoint } from './use-breakpoint';

function UseBreakpointDemo() {
  const { windowWidth, isBreakpointCrossed } = useBreakpoint(768);

  return (
    <div className="relative mb-[10px] rounded-lg border p-[2em] transition-colors">
      <div className="mb-4">
        <p className="text-lg">
          Current Window Width:{' '}
          <span className="font-semibold">{windowWidth}px</span>
        </p>
      </div>
      <div className="mb-4">
        <p className="text-lg">
          Breakpoint Crossed:{' '}
          <span className="font-semibold">
            {isBreakpointCrossed ? 'Yes' : 'No'}
          </span>
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-600">
          Resize the window to see the effect.
        </p>
      </div>
    </div>
  );
}

export default UseBreakpointDemo;
