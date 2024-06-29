import { useRef, useEffect } from 'react';

export function useRenderInfo(name: string): {
  name: string;
  renders: number;
  sinceLastRender: number;
  timestamp: number;
} {
  const renderInfo = useRef({
    name,
    renders: 0,
    sinceLastRender: 0,
    timestamp: 0,
  });

  useEffect(() => {
    const now = Date.now();
    renderInfo.current.renders++;
    renderInfo.current.sinceLastRender = now - renderInfo.current.timestamp;
    renderInfo.current.timestamp = now;
  });

  return renderInfo.current;
}
