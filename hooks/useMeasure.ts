import { useState, useEffect, useRef } from "react";

type UseMeasureReturn = {
  height: number;
  width: number;
  ref: React.RefObject<HTMLElement | null>;
};

const useMeasure = (): UseMeasureReturn => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
      setWidth(ref.current.offsetWidth);
    }
  }, [ref.current]);

  return {
    height,
    width,
    ref,
  };
};

type UseSizeReturn = {
  size: { height: number; width: number };
  ref: React.RefObject<HTMLElement | null>;
};

const useSize = (): UseSizeReturn => {
  const [size, setSize] = useState<{ height: number; width: number }>({
    height: 0,
    width: 0,
  });
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      setSize({
        height: ref.current.offsetHeight,
        width: ref.current.offsetWidth,
      });
    }
  }, [ref.current]);

  return {
    size,
    ref,
  };
};

export default { useSize, useMeasure };
