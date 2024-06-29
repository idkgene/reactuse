import * as React from 'react';

interface MouseInElementState {
  x: number;
  y: number;
  elementX: number;
  elementY: number;
  elementPositionX: number;
  elementPositionY: number;
  elementHeight: number;
  elementWidth: number;
  isOutside: boolean;
}

interface MouseInElementOptions {
  handleOutside?: boolean;
}

export function useMouseInElement(
  ref: React.RefObject<HTMLElement>,
  options: MouseInElementOptions = { handleOutside: true },
): MouseInElementState {
  const { handleOutside } = options;

  const [state, setState] = React.useState<MouseInElementState>({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    elementPositionX: 0,
    elementPositionY: 0,
    elementHeight: 0,
    elementWidth: 0,
    isOutside: true,
  });

  const updateMousePosition = (event: MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const elementX = event.clientX - rect.left;
    const elementY = event.clientY - rect.top;
    const isOutside =
      elementX < 0 ||
      elementY < 0 ||
      elementX > rect.width ||
      elementY > rect.height;

    setState({
      x: event.clientX,
      y: event.clientY,
      elementX,
      elementY,
      elementPositionX: rect.left,
      elementPositionY: rect.top,
      elementHeight: rect.height,
      elementWidth: rect.width,
      isOutside: handleOutside ? isOutside : false,
    });
  };

  React.useEffect(() => {
    document.addEventListener('mousemove', updateMousePosition);
    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
    };
  }, [ref]);

  return state;
}
