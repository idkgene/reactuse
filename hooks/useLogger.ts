import { useEffect, useRef } from "react";

export const useLogger = (name, ...args) => {
  const componentsName = useRef(name);

  useEffect(() => {
    console.log(`[${componentsName.current}] Mounted`, ...args);

    return () => {
      console.log(`[${componentsName.current}] Unmounted`, ...args);
    };
  }, []);

  useEffect(() => {
    console.log(`[${componentsName.current}] Updated`, ...args);
  });
};
