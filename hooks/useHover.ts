/**
 * @module useHover
 * @template T - The type of the HTML element to track hover state for.
 * @returns {[RefObject<T>, boolean]} An array containing a ref object to attach to the target element, and a boolean indicating the hover state.
 */

import { RefObject, useEffect, useState } from "react";

export const useHover = (ref: RefObject<HTMLElement>): boolean => {
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const handleMouseEnter = () => setHovering(true);
    const handleMouseLeave = () => setHovering(false);

    // Add event listeners to the node
    node.addEventListener("mouseenter", handleMouseEnter);
    node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node.removeEventListener("mouseenter", handleMouseEnter);
      node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);

  return hovering;
}
