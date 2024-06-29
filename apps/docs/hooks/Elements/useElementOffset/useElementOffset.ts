import { useRef, useState, useEffect, useCallback } from 'react';

interface Offset {
  left: number;
  top: number;
}

interface OffsetOptions {
  relative?: 'document' | 'parent';
}

interface UseElementOffsetReturn {
  ref: React.RefObject<HTMLElement>;
  offset: Offset;
  updateOffset: () => void;
}

export function useElementOffset(
  options: OffsetOptions = {},
): UseElementOffsetReturn {
  const { relative = 'document' } = options;
  const elementRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState<Offset>({ left: 0, top: 0 });

  const getOffset = useCallback((): Offset => {
    if (!elementRef.current) {
      return { left: 0, top: 0 };
    }

    const rect = elementRef.current.getBoundingClientRect();

    if (relative === 'document') {
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      return {
        left: rect.left + scrollLeft,
        top: rect.top + scrollTop,
      };
    } 
      const parentRect =
        elementRef.current.offsetParent?.getBoundingClientRect() || {
          left: 0,
          top: 0,
        };

      return {
        left: rect.left - parentRect.left,
        top: rect.top - parentRect.top,
      };
    
  }, [relative]);

  const updateOffset = useCallback(() => {
    setOffset(getOffset());
  }, [getOffset]);

  useEffect(() => {
    updateOffset();

    const handleResize = () => {
      updateOffset();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, [updateOffset]);

  return { ref: elementRef, offset, updateOffset };
}
