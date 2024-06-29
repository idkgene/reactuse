import { useEffect, useState } from 'react';

export const useGeolocation = () => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if the Geolocation API is supported by the browser
    if (!navigator.geolocation) {
      setError({
        code: 2,
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
        message: 'Geolocation not supported',
      });
      setLoading(false);
      return;
    }

    // Success callback function for watchPosition
    const successHandler = (pos: GeolocationPosition) => {
      setPosition(pos);
      setLoading(false);
    };

    // Error callback function for watchPosition
    const errorHandler = (err: GeolocationPositionError) => {
      setError(err);
      setLoading(false);
    };

    // Options for watchPosition
    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    // Start loading
    setLoading(true);

    // Call watchPosition with the success and error callbacks and options
    const watchId = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options,
    );

    // Clean up the watch when the component unmounts
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // Extract the necessary properties from the position object
  const {
    accuracy,
    altitude,
    altitudeAccuracy,
    heading,
    latitude,
    longitude,
    speed,
  } = position?.coords || {};

  // Return the geolocation data and loading/error states
  return {
    loading,
    accuracy: accuracy ?? null,
    altitude: altitude ?? null,
    altitudeAccuracy: altitudeAccuracy ?? null,
    heading: heading ?? null,
    latitude: latitude ?? null,
    longitude: longitude ?? null,
    speed: speed ?? null,
    timestamp: position?.timestamp ?? null,
    error,
  };
};
