'use client';

import { useWebNotification } from './useWebNotification';

const WebNotificationDemo: React.FC = () => {
  const { show, close, onClick, onClose } = useWebNotification({
    title: 'Hello',
    body: 'This is a notification',
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    show();
  };

  const handleClose = (e: any) => {
    e.preventDefault();
    close();
    console.log('Notification closed');
  };

  return (
    <div>
      <button onClick={handleClick}>Show Notification</button>
      <button onClick={handleClose}>Close Notification</button>
    </div>
  );
};

export default WebNotificationDemo;
