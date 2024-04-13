import { useState, useEffect } from "react";

interface Device {
  deviceId: string;
  kind: string;
  label: string;
}

const useConnectedDevices = (): Device[] => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const handleDeviceChange = () => {
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        navigator.mediaDevices.enumerateDevices().then((deviceList) => {
          const connectedDevices: Device[] = deviceList.map((device) => ({
            deviceId: device.deviceId,
            kind: device.kind,
            label: device.label,
          }));
          setDevices(connectedDevices);
        });
      }
    };

    if (navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
      navigator.mediaDevices.addEventListener(
        "devicechange",
        handleDeviceChange
      );

      handleDeviceChange();
    }

    return () => {
      if (
        navigator.mediaDevices &&
        navigator.mediaDevices.removeEventListener
      ) {
        navigator.mediaDevices.removeEventListener(
          "devicechange",
          handleDeviceChange
        );
      }
    };
  }, []);

  return devices;
};

export default useConnectedDevices;
