import { useState, useMemo, useCallback, useEffect } from 'react';

interface UseStyleTagOptions {
  media?: string;
  immediate?: boolean;
  manual?: boolean;
  id?: string;
}

interface UseStyleTagReturn {
  id: string;
  css: string;
  setCss: (newCss: string) => void;
  load: () => void;
  unload: () => void;
  isLoaded: boolean;
}

let styleTagCounter = 0;

export function useStyleTag(
  initialCss: string,
  options: UseStyleTagOptions = {},
): UseStyleTagReturn {
  const { media, immediate = true, manual = false, id: customId } = options;

  const [css, setCss] = useState(initialCss);
  const [isLoaded, setIsLoaded] = useState(false);

  const id = useMemo(
    () => customId || `react-usetag-${++styleTagCounter}`,
    [customId],
  );

  const createStyleElement = useCallback(() => {
    const styleElement = document.createElement('style');
    styleElement.id = id;
    styleElement.textContent = css;
    if (media) styleElement.media = media;
    return styleElement;
  }, [id, css, media]);

  const load = useCallback(() => {
    if (isLoaded) return;

    const styleElement = createStyleElement();
    document.head.appendChild(styleElement);
    setIsLoaded(true);
  }, [isLoaded, createStyleElement]);

  const unload = useCallback(() => {
    if (!isLoaded) return;

    const styleElement = document.getElementById(id);
    if (styleElement && styleElement.parentNode) {
      styleElement.parentNode.removeChild(styleElement);
    }
    setIsLoaded(false);
  }, [isLoaded, id]);

  useEffect(() => {
    if (!manual && immediate) {
      load();
    }
    return () => {
      if (!manual) {
        unload();
      }
    };
  }, [manual, immediate, load, unload]);

  useEffect(() => {
    if (isLoaded) {
      const styleElement = document.getElementById(id) as HTMLStyleElement;
      if (styleElement) {
        styleElement.textContent = css;
      }
    }
  }, [css, id, isLoaded]);

  return { id, css, setCss, load, unload, isLoaded };
}
