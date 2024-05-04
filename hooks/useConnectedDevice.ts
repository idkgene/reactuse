import { useState, useEffect } from "react";

interface Device {
  deviceId: string;
  kind: string;
  label: string;
}

/**
 * A custom hook that returns an array of connected devices.
 * @param {Device[]} [devices=[]] - The initial list of connected devices.
 * @returns {Device[]} An array of connected devices.
 * 
 * @interface Device
 * @property {string} deviceId - The unique identifier of the device.
 * @property {string} kind - The kind of device (e.g., 'audioinput' or 'videoinput').
 * @property {string} label - The label of the device.
  */
export const useConnectedDevices = (): Device[] => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    /**
     * Handles devicechange event and updates the list of connected devices.
     */
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

    // Check if the mediaDevices API is Supported
    if (navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
      navigator.mediaDevices.addEventListener(
        "devicechange",
        handleDeviceChange
      );

      // Initial enumeration of devices
      handleDeviceChange();
    }

    // Cleanup function to remove the event listeners
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