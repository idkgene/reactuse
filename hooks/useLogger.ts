import { useEffect, useRef } from "react";

type LoggerArgs = any[];

/**
 * A custom hook that logs the mount and unmount events of a component.
 * @param name
 * @param args
 */
export const useLogger = <T>(name: T, ...args: LoggerArgs) => {
  if (name === null) {
    throw new Error("The name argument cannot be null or undefined");
  }

  const componentsName = useRef<T>(name);

  useEffect(() => {
    console.log(`[${componentsName.current}] Mounted`, ...(args || []));

    return () => {
      console.log(`[${componentsName.current}] Unmounted`, ...(args || []));
    };
  }, [componentsName, args]);

  useEffect(() => {
    console.log(`[${componentsName.current}] Updated`, ...(args || []));
  }, [componentsName, args]);
};
