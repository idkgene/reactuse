'use client';

import { useBreakpoint } from './useBreakpoint';

const UseBreakpointDemo = () => {
  const { windowWidth, isBreakpointCrossed } = useBreakpoint(768);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="p-6 bg-white rounded-lg shadow-lg">
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
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Resize the window to see the effect.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UseBreakpointDemo;
