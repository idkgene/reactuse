import { useRef, useEffect } from "react";

interface UseLastChangedOptions {
  initialValue?: number;
}

/**
 * A custom React hook that returns a reference to the last time a value was changed.
 * @template T - The type of the value.
 * @param {T} source - The value to check for changes.
 * @param {UseLastChangedOptions} [options] - Options for the hook.
 * @returns {React.MutableRefObject<number | null>} A reference to the last time the value was changed.
 */
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
