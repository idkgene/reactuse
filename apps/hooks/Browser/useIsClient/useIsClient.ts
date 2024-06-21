import * as React from 'react';

/**
 * @name useIsClient
 * @description A custom React hook that returns `true` if the current environment is a client-side environment, and `false` otherwise.
 *
 * @returns {boolean} `true` if the current environment is a client-side environment, and `false` otherwise.
 *
 * @example
 * const isClient = useIsClient()
 */
export const useIsClient = (): boolean => {
  const [isClient, setClient] = React.useState<boolean>(false);

  React.useEffect(() => {
    setClient(true);
  }, []);

  return isClient;
};
