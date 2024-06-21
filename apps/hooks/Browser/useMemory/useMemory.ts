import * as React from 'react';

interface MemoryInfo {
  readonly jsHeapSizeLimit: number;
  readonly totalJSHeapSize: number;
  readonly usedJSHeapSize: number;
  [Symbol.toStringTag]: 'MemoryInfo';
}

interface UseMemoryOptions {
  interval?: number;
  immediate?: boolean;
}

type PerformanceMemory = Performance & {
  memory: MemoryInfo;
};

type UseMemoryReturn = {
  isSupported: boolean;
  memory: MemoryInfo | undefined;
};

function useMemory(options: UseMemoryOptions = {}): UseMemoryReturn {
  const { interval = 1000, immediate = true } = options;
  const [memory, setMemory] = React.useState<MemoryInfo>();
  const isSupported =
    typeof performance !== 'undefined' && 'memory' in performance;
  const intervalRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (isSupported) {
      const updateMemory = () => {
        setMemory((performance as PerformanceMemory).memory);
      };

      if (immediate) {
        updateMemory();
      }

      intervalRef.current = setInterval(updateMemory, interval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isSupported, interval, immediate]);

  return { isSupported, memory };
}

export default useMemory;
