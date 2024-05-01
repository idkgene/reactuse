import { useState, useEffect } from "react";

const useBreakpoint = (breakpoint) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isBreakpointCrossed, setIsBreakpointCrossed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;
      setWindowWidth(newWindowWidth);

      if (newWindowWidth >= breakpoint && windowWidth < breakpoint) {
        setIsBreakpointCrossed(true);
      } else if (newWindowWidth < breakpoint && windowWidth >= breakpoint) {
        setIsBreakpointCrossed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return { windowWidth, isBreakpointCrossed };
};

export default useBreakpoint;
