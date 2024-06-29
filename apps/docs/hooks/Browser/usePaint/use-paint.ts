import { useRef, useCallback, useState, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
}

interface PaintOptions {
  lineWidth: number;
  strokeStyle: string;
  smoothing: number;
  opacity: number;
}

interface PaintActions {
  startDrawing: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  draw: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  stopDrawing: () => void;
  clear: () => void;
  undo: () => void;
  download: () => void;
  setLineWidth: (width: number) => void;
  setStrokeStyle: (color: string) => void;
  setSmoothingFactor: (factor: number) => void;
  setOpacity: (opacity: number) => void;
}

class Pointer implements Point {
  constructor(
    public x: number,
    public y: number,
  ) {}

  update(point: Point): void {
    this.x = point.x;
    this.y = point.y;
  }

  getDistanceTo(point: Point): number {
    const dx = this.x - point.x;
    const dy = this.y - point.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  getAngleTo(point: Point): number {
    return Math.atan2(point.y - this.y, point.x - this.x);
  }
}

const usePaint = (
  initialOptions: Partial<PaintOptions> = {},
): [React.RefObject<HTMLCanvasElement>, PaintActions] => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [options, setOptions] = useState<PaintOptions>({
    lineWidth: initialOptions.lineWidth ?? 2,
    strokeStyle: initialOptions.strokeStyle ?? '#000000',
    smoothing: initialOptions.smoothing ?? 0.5,
    opacity: initialOptions.opacity ?? 1,
  });
  const [history, setHistory] = useState<ImageData[]>([]);
  const [currentPath, setCurrentPath] = useState<Point[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        contextRef.current = ctx;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = options.lineWidth;
        ctx.strokeStyle = options.strokeStyle;
        ctx.globalAlpha = options.opacity;
      }
    }
  }, [options]);

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (canvas && ctx) {
      setHistory((prev) => [
        ...prev,
        ctx.getImageData(0, 0, canvas.width, canvas.height),
      ]);
    }
  }, []);

  const startDrawing = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      setIsDrawing(true);
      const { offsetX, offsetY } = event.nativeEvent;
      setCurrentPath([{ x: offsetX, y: offsetY }]);
    },
    [],
  );

  const draw = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing || !contextRef.current) return;
      const { offsetX, offsetY } = event.nativeEvent;

      setCurrentPath((prev) => {
        const newPath = [...prev, { x: offsetX, y: offsetY }];
        const ctx = contextRef.current;
        if (ctx) {
          ctx.beginPath();
          ctx.moveTo(newPath[0].x, newPath[0].y);

          if (newPath.length > 2) {
            for (let i = 1; i < newPath.length - 2; i++) {
              const xc = (newPath[i].x + newPath[i + 1].x) / 2;
              const yc = (newPath[i].y + newPath[i + 1].y) / 2;
              ctx.quadraticCurveTo(newPath[i].x, newPath[i].y, xc, yc);
            }
            ctx.quadraticCurveTo(
              newPath[newPath.length - 2].x,
              newPath[newPath.length - 2].y,
              newPath[newPath.length - 1].x,
              newPath[newPath.length - 1].y,
            );
          } else {
            ctx.lineTo(
              newPath[newPath.length - 1].x,
              newPath[newPath.length - 1].y,
            );
          }
          ctx.stroke();
        }
        return newPath;
      });
    },
    [isDrawing],
  );

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    if (currentPath.length > 1) {
      saveState();
    }
    setCurrentPath([]);
  }, [currentPath, saveState]);

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      saveState();
    }
  }, [saveState]);

  const undo = useCallback(() => {
    if (history.length > 0) {
      const canvas = canvasRef.current;
      const ctx = contextRef.current;
      if (canvas && ctx) {
        const previousState = history[history.length - 2]; // Get the second last state
        if (previousState) {
          ctx.putImageData(previousState, 0, 0);
          setHistory((prev) => prev.slice(0, -1));
        } else {
          clear();
        }
      }
    }
  }, [history, clear]);

  const download = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'canvas-drawing.png';
      link.href = dataURL;
      link.click();
    }
  }, []);

  const setLineWidth = useCallback((width: number) => {
    setOptions((prev) => ({ ...prev, lineWidth: width }));
  }, []);

  const setStrokeStyle = useCallback((color: string) => {
    setOptions((prev) => ({ ...prev, strokeStyle: color }));
  }, []);

  const setSmoothingFactor = useCallback((factor: number) => {
    setOptions((prev) => ({ ...prev, smoothing: factor }));
  }, []);

  const setOpacity = useCallback((opacity: number) => {
    setOptions((prev) => ({ ...prev, opacity }));
  }, []);

  return [
    canvasRef,
    {
      startDrawing,
      draw,
      stopDrawing,
      clear,
      undo,
      download,
      setLineWidth,
      setStrokeStyle,
      setSmoothingFactor,
      setOpacity,
    },
  ];
};

export default usePaint;
