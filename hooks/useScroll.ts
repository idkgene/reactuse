import { useState, useEffect } from "react";

const useScroll = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      setIsScrolling(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return isScrolling;
};

export default useScroll;
