import { useEffect, useRef } from 'react';

export const useUpdateEffect: typeof useEffect = (effect, deps = []) => {
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (!isFirstMount.current) {
      return effect();
    }
    isFirstMount.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect, ...deps]); // Include effect and deps in the dependency array
};
