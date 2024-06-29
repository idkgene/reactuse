import { useState, useCallback, useEffect, useRef } from 'react';

export interface UseDisplayMediaOptions {
  enabled?: boolean;
  video?: boolean | MediaTrackConstraints;
  audio?: boolean | MediaTrackConstraints;
}

export interface UseDisplayMediaReturn {
  isSupported: boolean;
  stream: MediaStream | undefined;
  start: () => Promise<MediaStream | undefined>;
  stop: () => void;
  enabled: boolean;
}

export const useDisplayMedia = (
  options: UseDisplayMediaOptions = {},
): UseDisplayMediaReturn => {
  const {
    enabled: initialEnabled = false,
    video = true,
    audio = false,
  } = options;

  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const [enabled, setEnabled] = useState<boolean>(initialEnabled);
  const isSupported =
    typeof navigator !== 'undefined' &&
    'mediaDevices' in navigator &&
    'getDisplayMedia' in navigator.mediaDevices;
  const constraintsRef = useRef({ video, audio });

  const start = useCallback(async () => {
    if (!isSupported) {
      console.warn('getDisplayMedia is not supported in this environment');
      return;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia(
        constraintsRef.current,
      );
      setStream(mediaStream);
      setEnabled(true);
      return mediaStream;
    } catch (error) {
      console.error('Error accessing display media:', error);
    }
  }, [isSupported]);

  const stop = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => { track.stop(); });
      setStream(undefined);
      setEnabled(false);
    }
  }, [stream]);

  useEffect(() => {
    constraintsRef.current = { video, audio };
  }, [video, audio]);

  useEffect(() => {
    if (enabled && !stream) {
      start();
    } else if (!enabled && stream) {
      stop();
    }
  }, [enabled, stream, start, stop]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { isSupported, stream, start, stop, enabled };
};
