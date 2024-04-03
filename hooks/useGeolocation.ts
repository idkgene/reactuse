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

import { useEffect, useState } from 'react'

export function useGeolocation() {
  const [position, setPosition] = useState<GeolocationPosition | null>(null)
  const [error, setError] = useState<GeolocationPositionError | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Check if the Geolocation API is supported by the browser
    if (!navigator.geolocation) {
      setError({
        code: 2,
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
        message: 'Geolocation not supported',
      })
      setLoading(false)
      return
    }

    // Success callback function for watchPosition
    const successHandler = (pos: GeolocationPosition) => {
      setPosition(pos)
      setLoading(false)
    }

    // Error callback function for watchPosition
    const errorHandler = (err: GeolocationPositionError) => {
      setError(err)
      setLoading(false)
    }

    // Options for watchPosition
    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }

    // Start loading
    setLoading(true)

    // Call watchPosition with the success and error callbacks and options
    const watchId = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options,
    )

    // Clean up the watch when the component unmounts
    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  // Extract the necessary properties from the position object
  const {
    accuracy,
    altitude,
    altitudeAccuracy,
    heading,
    latitude,
    longitude,
    speed,
  } = position?.coords || {}

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
  }
}
