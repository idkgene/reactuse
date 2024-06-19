import { useState, useEffect, useCallback } from 'react';

interface NotificationOptions {
  title: string;
  dir?: NotificationDirection;
  lang?: string;
  body?: string;
  tag?: string;
  icon?: string;
  image?: string;
  badge?: string;
  vibrate?: VibratePattern;
  timestamp?: number;
  renotify?: boolean;
  silent?: boolean;
  requireInteraction?: boolean;
  actions?: Array<NotificationAction>;
}

type NotificationDiretction = 'auto' | 'ltr' | 'rtl';
type VibratePattern = number | number[];
type NotificationAction = {
  action: string;
  title: string;
  icon?: string;
};

type NotificationEventHandler = (event: Event) => void;

interface UseWebNotificationResult {
  isSupported: boolean;
  notification: Notification | null;
  show: () => void;
  close: () => void;
  onClick: (handler: NotificationEventHandler) => void;
  onShow: (handler: NotificationEventHandler) => void;
  onError: (handler: NotificationEventHandler) => void;
  onClose: (handler: NotificationEventHandler) => void;
}

export function useWebNotification(
  options: NotificationOptions
): UseWebNotificationResult {
  const [isSupported, setIsSupported] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    setIsSupported('Notification' in window);
  }, []);

  const show = useCallback(() => {
    if (isSupported) {
      const newNotification = new Notification(options.title, options);
      setNotification(newNotification);
    }
  }, [isSupported, options]);

  const close = useCallback(() => {
    if (notification) {
      notification.close();
      setNotification(null);
    }
  }, [notification]);

  const onClick = useCallback(
    (handler: NotificationEventHandler) => {
      if (notification) {
        notification.onclick = handler;
      }
    },
    [notification]
  );

  const onShow = useCallback(
    (handler: NotificationEventHandler) => {
      if (notification) {
        notification.onshow = handler;
      }
    },
    [notification]
  );

  const onError = useCallback(
    (handler: NotificationEventHandler) => {
      if (notification) {
        notification.onerror = handler;
      }
    },
    [notification]
  );

  const onClose = useCallback(
    (handler: NotificationEventHandler) => {
      if (notification) {
        notification.onclose = handler;
      }
    },
    [notification]
  );

  return {
    isSupported,
    notification,
    show,
    close,
    onClick,
    onShow,
    onError,
    onClose,
  };
}
