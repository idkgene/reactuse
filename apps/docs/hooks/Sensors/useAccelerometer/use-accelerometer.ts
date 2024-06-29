import { useState, useEffect, useCallback } from 'react';

interface AccelerometerData {
  x: number;
  y: number;
  z: number;
}

interface UseAccelerometerResult {
  acceleration: AccelerometerData | null;
  error: Error | null;
  isSupported: boolean;
}

const useAccelerometer = (): UseAccelerometerResult => {
  const [acceleration, setAcceleration] = useState<AccelerometerData | null>(
    null,
  );
  const [error, setError] = useState<Error | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(false);

  const handleMotion = useCallback((event: DeviceMotionEvent) => {
    const { accelerationIncludingGravity } = event;
    if (accelerationIncludingGravity) {
      setAcceleration({
        x: accelerationIncludingGravity.x ?? 0,
        y: accelerationIncludingGravity.y ?? 0,
        z: accelerationIncludingGravity.z ?? 0,
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
      setIsSupported(true);

      const requestPermission = async () => {
        try {
          if (
            typeof (DeviceMotionEvent as any).requestPermission === 'function'
          ) {
            const permissionState = await (
              DeviceMotionEvent as any
            ).requestPermission();
            if (permissionState === 'granted') {
              window.addEventListener('devicemotion', handleMotion);
            } else {
              throw new Error('Accelerometer permission denied');
            }
          } else {
            window.addEventListener('devicemotion', handleMotion);
          }
        } catch (err) {
          setError(
            err instanceof Error ? err : new Error('Unknown error occurred'),
          );
        }
      };

      requestPermission();

      return () => {
        window.removeEventListener('devicemotion', handleMotion);
      };
    } 
      setIsSupported(false);
      setError(new Error('Accelerometer is not supported on this device'));
    
  }, [handleMotion]);

  return { acceleration, error, isSupported };
};

export default useAccelerometer;
