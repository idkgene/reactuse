import { useEffect, useRef, useState } from 'react';

export interface UseBroadcastChannelOptions {
  name: string;
}

export interface UseBroadcastChannelReturn<D, P> {
  isSupported: boolean;
  channel: React.MutableRefObject<BroadcastChannel | undefined>;
  data: D | undefined;
  post: (data: P) => void;
  close: () => void;
  error: Error | null;
  isClosed: boolean;
}

export function useBroadcastChannel<D, P>(
  options: UseBroadcastChannelOptions,
): UseBroadcastChannelReturn<D, P> {
  const isSupported = 'BroadcastChannel' in window;
  const channel = useRef<BroadcastChannel>();
  const [data, setData] = useState<D>();
  const [error, setError] = useState<Error | null>(null);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (isSupported) {
      try {
        channel.current = new BroadcastChannel(options.name);
        channel.current.onmessage = (event: MessageEvent) => {
          setData(event.data);
        };
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      }
    }

    return () => {
      if (channel.current) {
        channel.current.close();
        setIsClosed(true);
      }
    };
  }, [options.name, isSupported]);

  const post = (data: P) => {
    if (channel.current && !isClosed) {
      try {
        channel.current.postMessage(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      }
    }
  };

  const close = () => {
    if (channel.current) {
      channel.current.close();
      setIsClosed(true);
    }
  };

  return {
    isSupported,
    channel,
    data,
    post,
    close,
    error,
    isClosed,
  };
}
