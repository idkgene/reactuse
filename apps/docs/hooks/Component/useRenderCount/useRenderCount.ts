import { useEffect, useRef } from 'react';

export const useRenderCount = (): RenderCount => {
  const numRenders = useRef<RenderCount>(0);

  useEffect(() => {
    numRenders.current += 1;
  });

  return numRenders.current;
};
