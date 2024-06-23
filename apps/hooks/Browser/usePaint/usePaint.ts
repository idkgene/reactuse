import type { Dispatch, RefObject, SetStateAction } from 'react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export const useEvent = <Params extends unknown[], Return>(
  callback: (...args: Params) => Return,
): ((...args: Params) => Return) => {
  const callbackRef = useRef<typeof callback>(callback);

  useIsomorphicLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args) => {
    const fn = callbackRef.current;
    return fn(...args);
  }, []);
};

export interface UsePaintPencil {
  color?: string;
  width?: number;
  opacity?: number;
  smoothing?: number;
}

export type UsePaintOptions = UsePaintPencil;

export interface UsePaintReturn {
  pencil: UsePaintPencil & { set: Dispatch<SetStateAction<UsePaintPencil>> };
  drawing: boolean;
  clear: () => void;
  undo: () => void;
  changeBrushSize: (size: number) => void;
  changeBrushColor: (color: string) => void;
  changeOpacity: (opacity: number) => void;
  changeSmoothing: (smoothing: number) => void;
  save: () => void;
}

export type UsePaintTarget =
  | RefObject<HTMLCanvasElement>
  | (() => HTMLCanvasElement)
  | HTMLCanvasElement;

export const getTargetElement = (target: UsePaintTarget) => {
  if (typeof target === 'function') {
    return target();
  }

  if (target instanceof Element) {
    return target;
  }

  return target.current;
};

export type UsePaint = {
  <Target extends UsePaintTarget>(
    target: Target,
    options?: UsePaintOptions,
  ): UsePaintReturn;

  (
    options?: UsePaintOptions,
    target?: never,
  ): UsePaintReturn & { ref: RefObject<HTMLCanvasElement> };
};
export const usePaint = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const [drawing, setDrawing] = useState(false);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const [pencil, setPencil] = useState({
    width: 5,
    color: 'black',
    opacity: 1,
    smoothing: 0.5,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = pencil.color;
      context.lineWidth = pencil.width;
      context.globalAlpha = pencil.opacity;
      contextRef.current = context;
    }

    // Save initial blank state
    saveState();
  }, [canvasRef]);

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;

    const imageData = contextRef.current.getImageData(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), imageData]);
    setHistoryIndex((prev) => prev + 1);
  }, [canvasRef, historyIndex]);

  const startDrawing = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const { offsetX, offsetY } = event.nativeEvent;
      if (!contextRef.current) return;

      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setDrawing(true);
      lastPointRef.current = { x: offsetX, y: offsetY };
    },
    [],
  );

  const draw = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!drawing || !contextRef.current || !lastPointRef.current) return;
      const { offsetX, offsetY } = event.nativeEvent;

      const midPoint = {
        x:
          lastPointRef.current.x +
          (offsetX - lastPointRef.current.x) * pencil.smoothing,
        y:
          lastPointRef.current.y +
          (offsetY - lastPointRef.current.y) * pencil.smoothing,
      };

      contextRef.current.quadraticCurveTo(
        lastPointRef.current.x,
        lastPointRef.current.y,
        midPoint.x,
        midPoint.y,
      );
      contextRef.current.stroke();

      lastPointRef.current = { x: offsetX, y: offsetY };
    },
    [drawing, pencil.smoothing],
  );

  const stopDrawing = useCallback(() => {
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setDrawing(false);
    lastPointRef.current = null;
    saveState();
  }, [saveState]);

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;

    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    saveState();
  }, [canvasRef, saveState]);

  const undo = useCallback(() => {
    if (historyIndex <= 0) return;

    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;

    setHistoryIndex((prev) => prev - 1);
    const imageData = history[historyIndex - 1];
    contextRef.current.putImageData(imageData, 0, 0);
  }, [history, historyIndex]);

  const changeBrushSize = useCallback((size: number) => {
    setPencil((prev) => ({ ...prev, width: size }));
  }, []);

  const changeBrushColor = useCallback((color: string) => {
    setPencil((prev) => ({ ...prev, color }));
  }, []);

  const changeOpacity = useCallback((opacity: number) => {
    setPencil((prev) => ({ ...prev, opacity }));
  }, []);

  const changeSmoothing = useCallback((smoothing: number) => {
    setPencil((prev) => ({
      ...prev,
      smoothing: Math.max(0, Math.min(1, smoothing)),
    }));
  }, []);

  useEffect(() => {
    if (!contextRef.current) return;
    contextRef.current.strokeStyle = pencil.color;
    contextRef.current.lineWidth = pencil.width;
    contextRef.current.globalAlpha = pencil.opacity;
  }, [pencil.color, pencil.width, pencil.opacity]);

  return {
    startDrawing,
    draw,
    stopDrawing,
    clear,
    undo,
    changeBrushSize,
    changeBrushColor,
    changeOpacity,
    changeSmoothing,
    pencil,
    canUndo: historyIndex > 0,
  };
};
