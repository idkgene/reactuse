import { useIntersectionObserver } from "../../../hooks/@Elements/useIntersectionObserver";
import { useCallback, useEffect, useRef } from "react";
import styles from "./index.module.css";
import { Button } from "@/components/UI/button";

export default function IntersectionObserverShowcase() {
  const observerRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(observerRef, {
    threshold: 0.5,
  });

  useEffect(() => {
    if (entry) {
      console.log(
        `useIntersectionObserver: Element is ${
          entry.isIntersecting ? "visible" : "hidden"
        }`
      ); //unneccessary
    }
  }, [entry]);

  const clearConsole = useCallback(() => {
    console.clear();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h2 id="useIntersectionObserver">useIntersectionObserver</h2>
        <div ref={observerRef}>
          <p>
            ⬇️ Scroll this element into view to see it logged to the console.
          </p>
        </div>
        <Button className="w-fit" onClick={clearConsole}>
          Clear console
        </Button>
      </div>
    </>
  );
}
