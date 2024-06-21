import * as React from 'react';

export interface UseDisplayMediaOptions {
  /**
   * If the stream video media constraints
   */
  video?: boolean | MediaTrackConstraints;
  /**
   * If the stream audio media constraints
   */
  audio?: boolean | MediaTrackConstraints;
}

export interface UseDisplayMediaResult {
  /**
   * The current MediaStream
   */
  stream: MediaStream | null;
  /**
   * Indicates whether the browser supports `mediaDevices.getDisplayMedia()`
   */
  isSupported: boolean;
  /**
   * Starts the screen sharing stream
   */
  start: () => Promise<void>;
  /**
   * Stops the screen sharing stream
   */
  stop: () => void;
}

export const useDisplayMedia = (
  options: UseDisplayMediaOptions = {}
): UseDisplayMediaResult => {
  const [stream, setStream] = React.useState<MediaStream | null>(null);
  const isSupported = 'getDisplayMedia' in navigator.mediaDevices;

  const start = React.useCallback(async () => {
    if (!isSupported) {
      return;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia(options);
      setStream(mediaStream);
    } catch (error) {
      console.error('Error accessing display media:', error);
    }
  }, [options, isSupported]);

  const stop = React.useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  React.useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { stream, isSupported, start, stop };
};
