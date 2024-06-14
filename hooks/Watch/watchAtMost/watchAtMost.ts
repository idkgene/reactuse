import * as React from 'react'

interface WatchAtMostOptions {
  count: number;
}

export interface WatchAtMostReturn {
  stop: () => void;
  count: number;
}

export function watchAtMost<T>(
  source: T,
  callback: (value: T) => void,
  options: WatchAtMostOptions
): WatchAtMostReturn {
  const [triggerCount, setTriggerCount] = React.useState(0);
  const stopRef = React.useRef(false);
  const countRef = React.useRef(options.count);
  const prevSourceRef = React.useRef<T | undefined>(undefined);

  const stop = () => {
    stopRef.current = true;
  };

  React.useEffect(() => {
    if (stopRef.current || triggerCount >= countRef.current) return;

    const shouldTriggerCallback =
      prevSourceRef.current !== undefined && prevSourceRef.current !== source;

    if (shouldTriggerCallback) {
      callback(source);
      setTriggerCount(prev => prev + 1);
    }

    prevSourceRef.current = source;
  }, [source, callback, triggerCount]);

  return {
    stop,
    count: triggerCount,
  };
}
