# `useGeolocation`

A powerful and efficient React hook that simplifies the process of accessing geolocation data in your application, providing real-time updates on the device's position and related information. 🌍📍

## Usage

```tsx
import { useGeolocation } from "./useGeolocation";

const MyComponent = () => {
  const {
    loading,
    accuracy,
    altitude,
    altitudeAccuracy,
    heading,
    latitude,
    longitude,
    speed,
    timestamp,
    error,
  } = useGeolocation();

  if (loading) {
    return <div>Loading geolocation data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <p>Accuracy: {accuracy} meters</p>
      <p>Altitude: {altitude} meters</p>
      <p>Altitude Accuracy: {altitudeAccuracy} meters</p>
      <p>Heading: {heading} degrees</p>
      <p>Speed: {speed} meters/second</p>
      <p>Timestamp: {new Date(timestamp).toLocaleString()}</p>
    </div>
  );
};
```

## Reference

```tsx
/**
 * @returns The `useGeolocation` custom hook returns an object with the following properties:
 * - `loading`: a boolean indicating whether the geolocation data is still loading
 * - `accuracy`: the accuracy of the geolocation coordinates
 * - `altitude`: the altitude in meters above the WGS 84 reference ellipsoid
 * - `altitudeAccuracy`: the accuracy of the altitude in meters
 * - `heading`: the direction in which the device is traveling, specified in degrees counting clockwise relative to the true north
 * - `latitude`: the latitude coordinate of the device's position, in decimal degrees
 * - `longitude`: the longitude coordinate of the device's position, in decimal degrees
 * - `speed`: the velocity of the device in meters per second
 * - `timestamp`: the time at which the position was determined
 * - `error`: the error object if there was an issue getting the geolocation data
 */
export function useGeolocation(): {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error: GeolocationPositionError | null;
};
```

## Under the hood

The `useGeolocation` hook leverages React's `useEffect` hook to manage the geolocation data and updates. It first checks if the Geolocation API is supported by the browser. If not, it sets an error state and returns early. If supported, it defines success and error callback functions to handle the geolocation data and errors respectively.

The hook then calls the `watchPosition` method of the Geolocation API, passing the success and error callbacks along with options for high accuracy, timeout, and maximum age. This method continuously monitors the device's position and triggers the appropriate callback whenever the position changes.

The hook extracts the relevant properties from the `position` object returned by the Geolocation API, such as latitude, longitude, accuracy, altitude, heading, and speed. It also keeps track of the loading state and any errors that may occur.

Finally, the hook returns an object containing the geolocation data, loading state, and error state, which can be easily accessed and used within your React components.
