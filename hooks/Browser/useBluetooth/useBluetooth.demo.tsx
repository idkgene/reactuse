'use client';
import React, { useEffect } from 'react';
import { useBluetooth } from './useBluetooth';

const UseBluetoothDemo = () => {
  const { isSupported, isConnected, device, requestDevice, server, error } =
    useBluetooth();

  useEffect(() => {
    if (isSupported) {
      requestDevice();
    }
  }, [isSupported, requestDevice]);

  return (
    <div>
      <h2>Bluetooth Demo</h2>
      <p>Is Bluetooth supported? {isSupported ? 'Yes' : 'No'}</p>
      <p>Is Bluetooth connected? {isConnected ? 'Yes' : 'No'}</p>
      <p>Device: {device ? device.name : 'None'}</p>
      <p>
        Error:{' '}
        {error
          ? error instanceof Error
            ? error.message
            : 'Unknown error'
          : 'None'}
      </p>
    </div>
  );
};

export default UseBluetoothDemo;
