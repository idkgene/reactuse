import { useRef, useEffect } from "react";

interface UseLastChangedOptions {
  initialValue?: number;
}

export function useLastChanged<T>(
  source: T,
  options: UseLastChangedOptions = {},
): React.MutableRefObject<number | null> {
  const { initialValue = null } = options;
  const lastChanged = useRef<number | null>(initialValue);

  useEffect(() => {
    lastChanged.current = Date.now();
  }, [source]);

  return lastChanged;
}
