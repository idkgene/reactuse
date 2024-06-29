import { useState, useEffect } from 'react';

interface UseElementByPointOptions {
  x: number;
  y: number;
  multiple?: boolean;
}

interface UseElementByPointReturn {
  element: HTMLElement | HTMLElement[] | null;
}

export const useElementByPoint = ({
  x,
  y,
  multiple = false,
}: UseElementByPointOptions): UseElementByPointReturn => {
  const [element, setElement] = useState<HTMLElement | HTMLElement[] | null>(
    null,
  );

  useEffect(() => {
    const targetElement = multiple
      ? (document.elementsFromPoint(x, y) as HTMLElement[]) || null
      : (document.elementFromPoint(x, y) as HTMLElement) || null;

    setElement(targetElement);
  }, [x, y, multiple]);

  return { element };
};
