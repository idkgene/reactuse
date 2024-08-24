import { useDeviceMotion, type DeviceMotionState } from './use-device-motion';

function MotionDisplay({ data }: { data: DeviceMotionState }): JSX.Element {
  return (
    <pre>
      {JSON.stringify(
        {
          acceleration: data.acceleration ?? {},
          accelerationIncludingGravity: data.accelerationIncludingGravity ?? {},
          rotationRate: data.rotationRate ?? {},
          interval: data.interval,
        },
        null,
        2,
      )}
    </pre>
  );
}

function DeviceMotionDemo(): JSX.Element {
  const motionData = useDeviceMotion();

  return <MotionDisplay data={motionData} />;
}

export default DeviceMotionDemo;
