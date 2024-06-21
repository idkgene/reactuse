"use client"

import { useBluetooth } from './useBluetooth';

const BluetoothComponent: React.FC = () => {
  const { isSupported, isConnected, device, requestDevice, server, error } = useBluetooth();

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Bluetooth Example</h1>

      <p className="mb-4">
        Bluetooth API supported: <span className={`font-bold ${isSupported ? 'text-green-500' : 'text-red-500'}`}>{isSupported ? 'Yes' : 'No'}</span>
      </p>

      <div className="mb-4">
        <p>Connection status: <span className={`font-bold ${isConnected ? 'text-green-500' : 'text-red-500'}`}>{isConnected ? 'Connected' : 'Not connected'}</span></p>
        {device && (
          <div className="mt-2">
            <p>Device name: {device.name}</p>
            <p>Device ID: {device.id}</p>
          </div>
        )}
      </div>

      {isSupported && (
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
          onClick={requestDevice}
          disabled={isConnected}
        >
          {isConnected ? 'Connected' : 'Request Bluetooth Device'}
        </button>
      )}

      {error && (
        <div className="mt-4">
          <p className="font-bold text-red-500">Error:</p>
          <pre className="mt-2 p-2 bg-red-100 rounded-md text-red-500">{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default BluetoothComponent;