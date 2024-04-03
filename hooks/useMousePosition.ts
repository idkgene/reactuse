import { useEffect, useState } from 'react';


/**
 * @returns {Object} An object containing the current mouse position.
 * @returns {number} position.x - The x-coordinate of the mouse position.
 * @returns {number} position.y - The y-coordinate of the mouse position.
 */

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
};

export default useMousePosition;