import { useGeolocation } from '@hooks/useGeolocation'

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
  } = useGeolocation()

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useGeolocation"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useGeolocation
        </h2>
        {loading ? (
          <p>Loading geolocation data...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
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
  )
}
