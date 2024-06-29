'use client';

import { useBluetooth } from './use-bluetooth';

const BluetoothComponent: React.FC = () => {
  const { isSupported, isConnected, device, requestDevice, server, error } =
    useBluetooth();

  return (
    <div className="mx-auto mt-8 max-w-lg rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-4 text-3xl font-bold">Bluetooth Example</h1>

      <p className="mb-4">
        Bluetooth API supported:{' '}
        <span
          className={`font-bold ${isSupported ? 'text-green-500' : 'text-red-500'}`}
        >
          {isSupported ? 'Yes' : 'No'}
        </span>
      </p>

      <div className="mb-4">
        <p>
          Connection status:{' '}
          <span
            className={`font-bold ${isConnected ? 'text-green-500' : 'text-red-500'}`}
          >
            {isConnected ? 'Connected' : 'Not connected'}
          </span>
        </p>
        {device ? (
          <div className="mt-2">
            <p>Device name: {device.name}</p>
            <p>Device ID: {device.id}</p>
          </div>
        ) : null}
      </div>

      {isSupported ? (
        <button
          className="mb-4 rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={requestDevice}
          disabled={isConnected}
        >
          {isConnected ? 'Connected' : 'Request Bluetooth Device'}
        </button>
      ) : null}

      {error ? (
        <div className="mt-4">
          <p className="font-bold text-red-500">Error:</p>
          <pre className="mt-2 rounded-md bg-red-100 p-2 text-red-500">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  );
};

export default BluetoothComponent;
