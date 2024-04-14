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

## Under the hood

The `useNetworkState` hook leverages React's `useState` and `useEffect` hooks to efficiently monitor and update the network state. It listens for the `online` and `offline` events to detect changes in the device's online status. Additionally, it utilizes the `navigator.connection` API, when available, to retrieve information about the network connection speed and type. The hook updates the network state whenever changes occur, providing the latest information to your components.
