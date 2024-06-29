import { useCallback } from 'react';

const useRadiansToDegrees = () => {
  return useCallback((radians: number) => {
    try {
      return (radians * 180) / Math.PI;
    } catch (error) {
      console.error('Error in radians to degrees conversion:', error);
      return null;
    }
  }, []);
};

const useDegreesToRadians = () => {
  return useCallback((degrees: number) => {
    try {
      return (degrees * Math.PI) / 180;
    } catch (error) {
      console.error('Error in degrees to radians conversion:', error);
      return null;
    }
  }, []);
};

export { useRadiansToDegrees, useDegreesToRadians };
export const radiansToDegrees = useRadiansToDegrees;
export const degreesToRadians = useDegreesToRadians;
export const radsToDeg = useRadiansToDegrees;
export const degToRads = useDegreesToRadians;
