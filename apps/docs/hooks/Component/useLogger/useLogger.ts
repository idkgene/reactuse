import { useEffect, useRef } from 'react';

type LoggerArgs = [];

export const useLogger = <T>(name: T, ...args: LoggerArgs): void => {
  if (name === null || name === undefined) {
    throw new Error('The name argument cannot be null or undefined');
  }

  const componentsName = useRef<T>(name);

  useEffect(() => {
    console.log(`[${componentsName.current}] Mounted`, ...(args || []));
  }, [componentsName, args]);

  useEffect(() => {
    console.log(`[${componentsName.current}] Updated`, ...(args || []));
  }, [args]);

  useEffect(() => {
    console.log(`[${componentsName.current}] Updated`, ...(args || []));
  }, [componentsName, args]);
};
