import * as React from 'react';

/**
 * @name useMousePosition
 * @description This hook listens for 'mousemove' events on the window object to capture and update
 * the current mouse position. It returns an object containing the x and y coordinates
 * of the mouse cursor relative to the viewport.
 *
 * @returns {{x: number, y: number}} An object containing the x and y coordinates of the mouse position.
 *
 *  * @example
 * import { useMousePosition } from './useMousePosition';
 *
 * function Component() {
 *   const { x, y } = useMousePosition();
 *
 *   return (
 *     <div>
 *       <p>Mouse position - X: {x}, Y: {y}</p>
 *     </div>
 *   );
 * }
 */
export const useMousePosition = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
};
