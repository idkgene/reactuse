import { useCallback, useMemo } from 'react';

type Radians = number & { __brand: 'radians' };
type Degrees = number & { __brand: 'degrees' };

const isValidNumber = (value: unknown): value is number =>
  typeof value === 'number' && !isNaN(value) && isFinite(value);

const convertRadiansToDegrees = (radians: Radians): Degrees => {
  if (!isValidNumber(radians)) {
    throw new Error('Invalid radians value');
  }
  return ((radians * 180) / Math.PI) as Degrees;
};

const convertDegreesToRadians = (degrees: Degrees): Radians => {
  if (!isValidNumber(degrees)) {
    throw new Error('Invalid degrees value');
  }
  return ((degrees * Math.PI) / 180) as Radians;
};

interface AngleConversions {
  radiansToDegrees: (radians: Radians) => Degrees;
  degreesToRadians: (degrees: Degrees) => Radians;
}

export const useAngleConversions = (): AngleConversions => {
  const radiansToDegrees = useCallback((radians: Radians): Degrees => {
    try {
      return convertRadiansToDegrees(radians);
    } catch (error) {
      console.error('Radians to degrees conversion error:', error);
      throw error;
    }
  }, []);

  const degreesToRadians = useCallback((degrees: Degrees): Radians => {
    try {
      return convertDegreesToRadians(degrees);
    } catch (error) {
      console.error('Degrees to radians conversion error:', error);
      throw error;
    }
  }, []);

  return useMemo(
    () => ({ radiansToDegrees, degreesToRadians }),
    [radiansToDegrees, degreesToRadians],
  );
};

export const radiansToDegrees = (radians: Radians): Degrees =>
  convertRadiansToDegrees(radians);
export const degreesToRadians = (degrees: Degrees): Radians =>
  convertDegreesToRadians(degrees);

export const radsToDeg = radiansToDegrees;
export const degToRads = degreesToRadians;

export type { Radians, Degrees };
