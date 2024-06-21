import { useEffect, useRef } from 'react';

/**
 * Type representing the number of renders.
 *
 * @type {number} RenderCount
 */
type RenderCount = number;

/**
 * Custom React hook that returns the number of renders.
 *
 * @return {RenderCount} The number of times the component has rendered.
 
 * @example
 * const RenderCountComponent = () => {
 *   const renderCount = useRenderCount();
 *   return <p>Render Count: {renderCount}</p>;
 * };
 */
export const useRenderCount = (): RenderCount => {
  const numRenders = useRef<RenderCount>(0);

  /**
   * Increment the numRenders ref on each render.
   */
  useEffect(() => {
    numRenders.current += 1;
  });

  /**
   * Return the current number of renders.
   * @return {RenderCount} The number of renders.
   */
  return numRenders.current;
};
