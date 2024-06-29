import { useCallback, useEffect, useState } from 'react';

interface HistoryState {
  pathname: string;
  search: string;
  hash: string;
}

interface NavigateOptions {
  replace?: boolean;
  state?: any;
}

interface UseHistoryResult {
  location: HistoryState;
  push: (path: string, state?: any) => void;
  replace: (path: string, state?: any) => void;
  go: (delta: number) => void;
  goBack: () => void;
  goForward: () => void;
}

const useHistory = (): UseHistoryResult => {
  const [location, setLocation] = useState<HistoryState>(() => ({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  }));

  const updateLocation = useCallback(() => {
    setLocation({
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', updateLocation);
    return () => {
      window.removeEventListener('popstate', updateLocation);
    };
  }, [updateLocation]);

  const navigate = useCallback(
    (path: string, options: NavigateOptions = {}) => {
      try {
        const url = new URL(path, window.location.origin);
        const historyMethod = options.replace ? 'replaceState' : 'pushState';
        window.history[historyMethod](
          options.state || null,
          '',
          url.toString(),
        );
        updateLocation();
      } catch (error) {
        console.error('Navigation error:', error);
        throw new Error(`Failed to navigate to ${path}`);
      }
    },
    [updateLocation],
  );

  const push = useCallback(
    (path: string, state?: any) => {
      navigate(path, { state });
    },
    [navigate],
  );

  const replace = useCallback(
    (path: string, state?: any) => {
      navigate(path, { replace: true, state });
    },
    [navigate],
  );

  const go = useCallback((delta: number) => {
    try {
      window.history.go(delta);
    } catch (error) {
      console.error('Navigation error:', error);
      throw new Error(`Failed to navigate ${delta} steps`);
    }
  }, []);

  const goBack = useCallback(() => {
    go(-1);
  }, [go]);

  const goForward = useCallback(() => {
    go(1);
  }, [go]);

  return { location, push, replace, go, goBack, goForward };
};

export default useHistory;
