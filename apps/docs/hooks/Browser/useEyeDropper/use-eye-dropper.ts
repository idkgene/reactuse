import { useCallback, useMemo, useState } from 'react';

interface EyeDropperOpenOptions {
  signal?: AbortSignal;
}

interface UseEyeDropperOptions {
  initialValue?: string;
}

interface UseEyeDropperReturn {
  isSupported: boolean;
  sRGBHex: string;
  open: (
    openOptions?: EyeDropperOpenOptions,
  ) => Promise<{ sRGBHex: string } | undefined>;
}

export function useEyeDropper(
  options: UseEyeDropperOptions = {},
): UseEyeDropperReturn {
  const { initialValue = '' } = options;
  const [sRGBHex, setSRGBHex] = useState(initialValue);

  const isSupported = useMemo(() => {
    if (typeof window !== 'undefined' && 'EyeDropper' in window) {
      return true;
    }
    return false;
  }, []);

  const open = useCallback(
    async (openOptions?: EyeDropperOpenOptions) => {
      if (!isSupported) {
        return undefined;
      }

      const eyeDropper = new (window as any).EyeDropper();

      try {
        const result = await eyeDropper.open(openOptions);
        setSRGBHex(result.sRGBHex);
        return result;
      } catch (error) {
        console.error('EyeDropper open error:', error);
        return undefined;
      }
    },
    [isSupported],
  );

  return {
    isSupported,
    sRGBHex,
    open,
  };
}
