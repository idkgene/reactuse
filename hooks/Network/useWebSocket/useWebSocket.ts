import { useEffect, useRef, useState } from 'react';

const connectSocket = (url: string) => {
  return new WebSocket(url);
};

interface IOptions {
  onFail: () => void;
  onSuccess: () => void;
}

export const useWebSocket = (
  url: string,
  onMessage: (message: MessageEvent) => void,
  options?: IOptions
) => {
  const ws = useRef<WebSocket | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [waitingToReconnect, setWaitingToReconnect] = useState<any>(null);

  const send = (data: string) => {
    ws.current?.send(data);
  };

  useEffect(() => {
    if (waitingToReconnect) return;

    const setupWebSocket = () => {
      const client = connectSocket(url);
      ws.current = client;

      client.onerror = (e) => {
        if (options?.onFail) {
          options?.onFail();
        }
        console.error('WebSocket error:', e);
      };

      client.onopen = () => {
        setIsOpen(true);
        if (options?.onSuccess) {
          options?.onSuccess();
        }
      };

      client.onmessage = (message) => {
        onMessage(message);
      };

      client.onclose = () => {
        if (waitingToReconnect) return;

        setIsOpen(false);

        setWaitingToReconnect(true);

        setTimeout(() => {
          setWaitingToReconnect(null);
        }, 5000);
      };
    };

    setupWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, [url, waitingToReconnect]);

  return { client: ws.current, open: isOpen, send };
};