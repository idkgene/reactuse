# `useNetworkState`

A comprehensive and reliable React hook that effortlessly monitors and provides real-time information about the device's network connection, enabling your components to adapt and deliver optimal user experiences based on the current network state. 📡🌐

## Usage

```tsx
import { useNetworkState } from "./useNetworkState";

const MyComponent = () => {
  const { online, speed, type } = useNetworkState();

  return (
    <div>
      <p>Online: {online ? "Yes" : "No"}</p>
      <p>Speed: {speed} Mbps</p>
      <p>Connection Type: {type}</p>
    </div>
  );
};
```

## Reference

```tsx
interface NetworkState {
  online: boolean;
  speed: number;
  type: string;
}

/**
 * @returns {NetworkState} An object representing the current network state.
 */
export function useNetworkState(): NetworkState;
```
