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
  data?: any;
}

type NotificationDirection = 'auto' | 'ltr' | 'rtl';
type VibratePattern = number | number[];
type NotificationAction = {
  action: string;
  title: string;
  icon?: string;
};

type NotificationEventHandler = (event: Event) => void;

interface UseWebNotificationResult {
  isSupported: boolean;
  permission: NotificationPermission;
  notification: Notification | null;
  show: () => Promise<void>;
  close: () => void;
  requestPermission: () => Promise<NotificationPermission>;
  onClick: (handler: NotificationEventHandler) => void;
  onShow: (handler: NotificationEventHandler) => void;
  onError: (handler: NotificationEventHandler) => void;
  onClose: (handler: NotificationEventHandler) => void;
}

export function useWebNotification(
  options: NotificationOptions,
): UseWebNotificationResult {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] =
    useState<NotificationPermission>('default');
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    setIsSupported('Notification' in window);
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return 'denied' as NotificationPermission;
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }, [isSupported]);

  const show = useCallback(async () => {
    if (!isSupported) return;

    if (permission !== 'granted') {
      const newPermission = await requestPermission();
      if (newPermission !== 'granted') return;
    }

    const newNotification = new Notification(options.title, options);
    setNotification(newNotification);
  }, [isSupported, permission, requestPermission, options]);

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
    [notification],
  );

  const onShow = useCallback(
    (handler: NotificationEventHandler) => {
      if (notification) {
        notification.onshow = handler;
      }
    },
    [notification],
  );

  const onError = useCallback(
    (handler: NotificationEventHandler) => {
      if (notification) {
        notification.onerror = handler;
      }
    },
    [notification],
  );

  const onClose = useCallback(
    (handler: NotificationEventHandler) => {
      if (notification) {
        notification.onclose = handler;
      }
    },
    [notification],
  );

  return {
    isSupported,
    permission,
    notification,
    show,
    close,
    requestPermission,
    onClick,
    onShow,
    onError,
    onClose,
  };
}
