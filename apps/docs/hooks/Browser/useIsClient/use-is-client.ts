import * as React from 'react';

export const useIsClient = (): boolean => {
  const [isClient, setClient] = React.useState<boolean>(false);

  React.useEffect(() => {
    setClient(true);
  }, []);

  return isClient;
};
