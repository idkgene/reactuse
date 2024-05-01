import { useGeolocation } from "../../../hooks/useGeolocation";
import styles from "./index.module.css";

export default function GeolocationShowcase() {
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

  return (
    <>
      <div className={styles.container}>
        <h2 id="useGeolocation">useGeolocation</h2>
        {loading ? (
          <p>◌ Loading geolocation data...</p>
        ) : error ? (
          <p>⚠️ Error: {error.message}</p>
        ) : (
          <div>
            <p>Accuracy: {accuracy}</p>
            <p>Altitude: {altitude}</p>
            <p>Altitude Accuracy: {altitudeAccuracy}</p>
            <p>Heading: {heading}</p>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
            <p>Speed: {speed}</p>
            <p>Timestamp: {timestamp}</p>
          </div>
        )}
      </div>
    </>
  );
}
