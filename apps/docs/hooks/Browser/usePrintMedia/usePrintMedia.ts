import { useState, useEffect } from 'react';

interface UsePrintMediaResult {
  isPrintMode: boolean;
}

const usePrintMedia = (): UsePrintMediaResult => {
  const [isPrintMode, setIsPrintMode] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia('print');

    const handlePrintChange = (event: MediaQueryListEvent) => {
      setIsPrintMode(event.matches);
    };

    setIsPrintMode(mediaQueryList.matches);

    if (mediaQueryList.addListener) {
      mediaQueryList.addListener(handlePrintChange);
    } else {
      mediaQueryList.addEventListener('change', handlePrintChange);
    }

    return () => {
      if (mediaQueryList.removeListener) {
        mediaQueryList.removeListener(handlePrintChange);
      } else {
        mediaQueryList.removeEventListener('change', handlePrintChange);
      }
    };
  }, []);

  return { isPrintMode };
};

export default usePrintMedia;
