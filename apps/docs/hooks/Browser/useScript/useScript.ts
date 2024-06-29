import { useEffect } from 'react';

export function useScript(url: string): void {
  useEffect(() => {
    const script: HTMLScriptElement = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return (): void => {
      document.body.removeChild(script);
    };
  }, [url]);
}
