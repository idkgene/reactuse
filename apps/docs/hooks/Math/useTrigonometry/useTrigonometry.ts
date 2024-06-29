  import { useCallback } from 'react';

  const useTrigonometry = () => {
    const sin = useCallback((angle: number) => {
      try {
        return Math.sin(angle);
      } catch (error) {
        console.error('Error in sin calculation:', error);
        return null;
      }
    }, []);

    const cos = useCallback((angle: number) => {
      try {
        return Math.cos(angle);
      } catch (error) {
        console.error('Error in cos calculation:', error);
        return null;
      }
    }, []);

    const tan = useCallback((angle: number) => {
      try {
        return Math.tan(angle);
      } catch (error) {
        console.error('Error in tan calculation:', error);
        return null;
      }
    }, []);

    return { sin, cos, tan };
  };

  export { useTrigonometry };
  export const trigonometry = useTrigonometry;
