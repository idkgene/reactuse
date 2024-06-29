import { useRef, useEffect, useCallback } from 'react';

interface BlurOptions {
  blurAmount: number;
  transitionDuration?: number;
}

interface UseElementBlurReturn {
  ref: React.RefObject<HTMLElement>;
  blur: () => void;
  unblur: () => void;
  isBlurred: boolean;
}

export function useElementBlur(options: BlurOptions): UseElementBlurReturn {
  const { blurAmount, transitionDuration = 300 } = options;
  const elementRef = useRef<HTMLElement>(null);
  const isBlurredRef = useRef(false);

  const setBlurStyle = useCallback(
    (amount: number) => {
      if (elementRef.current) {
        elementRef.current.style.transition = `filter ${transitionDuration}ms ease-in-out`;
        elementRef.current.style.filter = `blur(${amount}px)`;
      }
    },
    [transitionDuration],
  );

  const blur = useCallback(() => {
    if (!isBlurredRef.current) {
      setBlurStyle(blurAmount);
      isBlurredRef.current = true;
    }
  }, [blurAmount, setBlurStyle]);

  const unblur = useCallback(() => {
    if (isBlurredRef.current) {
      setBlurStyle(0);
      isBlurredRef.current = false;
    }
  }, [setBlurStyle]);

  useEffect(() => {
    return () => {
      if (elementRef.current) {
        elementRef.current.style.filter = '';
        elementRef.current.style.transition = '';
      }
    };
  }, []);

  return {
    ref: elementRef,
    blur,
    unblur,
    get isBlurred() {
      return isBlurredRef.current;
    },
  };
}
