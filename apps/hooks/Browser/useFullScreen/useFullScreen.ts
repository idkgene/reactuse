import { useCallback, useEffect, useState, useRef } from 'react';

interface UseFullscreenOptions {
  /**
   * Automatically exit fullscreen when component is unmounted
   *
   * @default false
   */
  autoExit?: boolean;
}

/**
 * Fullscreen API
 *
 * @param target
 * @param options
 */

export function useFullscreen<T extends HTMLElement>(
  target?: React.RefObject<T>,
  options?: UseFullscreenOptions
): {
  isSupported: boolean;
  isFullscreen: boolean;
  enter: () => Promise<void>;
  exit: () => Promise<void>;
  toggle: () => Promise<void>;
} {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isSupported = useRef(document.fullscreenEnabled).current;

  const enter = useCallback(async () => {
    if (!target?.current) return;

    try {
      await target.current.requestFullscreen();
      setIsFullscreen(true);
    } catch (e) {
      console.error(e);
    }
  }, [target]);

  const exit = useCallback(async () => {
    if (!document.fullscreenElement) return;

    try {
      await document.exitFullscreen();
      setIsFullscreen(false);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggle = useCallback(async () => {
    if (isFullscreen) await exit();
    else await enter();
  }, [enter, exit, isFullscreen]);

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', onChange);

    return () => {
      if (options?.autoExit && isFullscreen) {
        exit();
      }
      document.removeEventListener('fullscreenchange', onChange);
    };
  }, [exit, isFullscreen, options?.autoExit]);

  return {
    isSupported,
    isFullscreen,
    enter,
    exit,
    toggle,
  };
}
