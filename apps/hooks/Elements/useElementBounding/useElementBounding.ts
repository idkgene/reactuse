import { useCallback, useEffect, useRef, useState } from 'react';

interface UseElementBoundingOptions {
  /**
   * Reset values to 0 on component unmount
   *
   * @default true
   */
  reset?: boolean;
  /**
   * Listen to window resize event
   *
   * @default true
   */
  windowResize?: boolean;
  /**
   * Listen to window scroll event
   *
   * @default true
   */
  windowScroll?: boolean;
  /**
   * Immediately call update on component mount
   *
   * @default true
   */
  immediate?: boolean;
}

interface ElementBounding {
  height: number;
  bottom: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

const defaultOptions: UseElementBoundingOptions = {
  reset: true,
  windowResize: true,
  windowScroll: true,
  immediate: true,
};

export function useElementBounding<T extends HTMLElement>(
  options: UseElementBoundingOptions = defaultOptions
): [React.RefObject<T>, ElementBounding] {
  const targetRef = useRef<T>(null);
  const [bounding, setBounding] = useState<ElementBounding>({
    height: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const update = useCallback(() => {
    const el = targetRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    setBounding({
      height: rect.height,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      top: rect.top,
      width: rect.width,
      x: rect.left,
      y: rect.top,
    });
  }, []);

  useEffect(() => {
    if (!targetRef.current) return;

    if (options.immediate) update();

    if (options.windowResize) {
      window.addEventListener('resize', update);
    }

    if (options.windowScroll) {
      window.addEventListener('scroll', update);
    }

    return () => {
      if (options.windowResize) {
        window.removeEventListener('resize', update);
      }

      if (options.windowScroll) {
        window.removeEventListener('scroll', update);
      }

      if (options.reset) {
        setBounding({
          height: 0,
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          width: 0,
          x: 0,
          y: 0,
        });
      }
    };
  }, [
    options.immediate,
    options.reset,
    options.windowResize,
    options.windowScroll,
    update,
  ]);

  return [targetRef, bounding];
}
