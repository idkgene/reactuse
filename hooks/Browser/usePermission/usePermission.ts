import { useState, useEffect } from 'react';

type PermissionDescriptor =
| 'accelerometer'
| 'ambient-light-sensor'
| 'background-sync'
| 'camera'
| 'clipboard-read'
| 'clipboard-write'
| 'geolocation'
| 'gyroscope'
| 'magnetometer'
| 'microphone'
| 'notifications'
| 'payment-handler'
| 'persistent-storage'
| 'push'
| 'speaker';

type PermissionState = 'granted' | 'denied' | 'prompt';

function usePermission(permissionDesc: PermissionName): PermissionState {
const [permissionState, setPermissionState] = useState<PermissionState>('prompt');

useEffect(() => {
  const queryPermission = async () => {
    if (navigator.permissions) {
      try {
        const result = await navigator.permissions.query({ name: permissionDesc });
        setPermissionState(result.state);

        result.onchange = () => {
          setPermissionState(result.state);
        };
      } catch (error) {
        console.error(`Error querying permission for ${permissionDesc}:`, error);
      }
    }
  };

  queryPermission();
}, [permissionDesc]);

return permissionState;
}

export default usePermission;