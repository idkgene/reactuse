import { useEffect, useState } from 'react';

export const useTyping = (): boolean => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleKeyDown = (): void => {
      setIsTyping(true);
    };

    const handleKeyUp = (): void => {
      setIsTyping(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return isTyping;
};
