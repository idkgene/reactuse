import { type RefObject, useEffect, useState } from 'react';

interface UseHoverOptions {
  onHoverChange?: (isHovering: boolean) => void;
  shouldHandleHover?: (isHovering: boolean, event: MouseEvent) => boolean;
}

export function useHover<T extends HTMLElement>(
  ref: RefObject<T>,
  options: UseHoverOptions = {},
): boolean {
  const { onHoverChange, shouldHandleHover } = options;
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const handleMouseEnter = (event: MouseEvent) => {
      const shouldHandle = shouldHandleHover?.(true, event) ?? true;

      if (shouldHandle) {
        setHovering(true);
        onHoverChange?.(true);
      }
    };

    const handleMouseLeave = (event: MouseEvent) => {
      const shouldHandle = shouldHandleHover?.(false, event) ?? true;

      if (shouldHandle) {
        setHovering(false);
        onHoverChange?.(false);
      }
    };

    // Add event listeners to the node
    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, onHoverChange, shouldHandleHover]);

  return hovering;
}
