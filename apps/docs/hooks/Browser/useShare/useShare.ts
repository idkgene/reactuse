import { useState, useEffect } from 'react';

export interface UseShareOptions {
  title?: string;
  text?: string;
  url?: string;
  files: File[];
}

export interface UseShareReturn {
  isSupported: boolean;
  share: (overrideOptions?: UseShareOptions) => Promise<void>;
}

export function useShare(initialOptions?: UseShareOptions): UseShareReturn {
  const [isSupported, setIsSupported] = useState<boolean>(false);

  useEffect(() => {
    setIsSupported(
      typeof navigator !== 'undefined' && typeof navigator.share === 'function',
    );
  }, []);

  const share = async (overrideOptions?: UseShareOptions): Promise<void> => {
    if (!isSupported) {
      console.warn('Web share API is not supported in this browser.');
      return;
    }

    const options = { ...initialOptions, ...overrideOptions };

    try {
      await navigator.share(options);
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };

  return { isSupported, share };
}
