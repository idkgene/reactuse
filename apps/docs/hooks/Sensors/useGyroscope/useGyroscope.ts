import { useState, useEffect, useCallback } from 'react';

interface GyroscopeData {
  alpha: number; // Вращение вокруг оси Z (от 0 до 360)
  beta: number; // Вращение вокруг оси X (от -180 до 180)
  gamma: number; // Вращение вокруг оси Y (от -90 до 90)
}

interface UseGyroscopeResult {
  orientation: GyroscopeData | null;
  error: Error | null;
  isSupported: boolean;
}

const useGyroscope = (): UseGyroscopeResult => {
  const [orientation, setOrientation] = useState<GyroscopeData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(false);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    setOrientation({
      alpha: event.alpha ?? 0,
      beta: event.beta ?? 0,
      gamma: event.gamma ?? 0,
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      setIsSupported(true);

      const requestPermission = async () => {
        try {
          if (
            typeof (DeviceOrientationEvent as any).requestPermission ===
            'function'
          ) {
            const permissionState = await (
              DeviceOrientationEvent as any
            ).requestPermission();
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            } else {
              throw new Error('Gyroscope permission denied');
            }
          } else {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } catch (err) {
          setError(
            err instanceof Error ? err : new Error('Unknown error occurred'),
          );
        }
      };

      requestPermission();

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation);
      };
    } 
      setIsSupported(false);
      setError(new Error('Gyroscope is not supported on this device'));
    
  }, [handleOrientation]);

  return { orientation, error, isSupported };
};

export default useGyroscope;
